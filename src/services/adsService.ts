import { Request, Response } from "express";

import { cloudinaryUploadSingle, cloudinaryDestroy } from "@/configs/cloudinary";
import Ads from "@models/AdsModel";
import { paginateOptions } from "@utils/paginate";
import errorHandler from "@exceptions/ErrorHandler";
import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import MESSAGES from "@constants/messages";

const getList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const options = paginateOptions({ page, limit });

    const response = await Ads.paginate({}, options, (err, result) => {
      if (err) {
        return errorHandler(HttpCode.BAD_REQUEST, err.message, true)(req, res);
      }
      return result;
    });

    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const getDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await Ads.findById(id).exec();
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.ADS_NOT_EXIST, true)(req, res);
    }
    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const checkExist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // FOR UPDATE
    let response;
    if (id) {
      response = await Ads.findById(id);
      if (!response) {
        return errorHandler(HttpCode.NOT_FOUND, MESSAGES.ADS_NOT_EXIST, true)(req, res);
      }
    }
    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { file, body } = req;

    const newAds = new Ads(body);

    if (file) {
      newAds.thumbnail = await cloudinaryUploadSingle(file, {
        folder: "ads",
      });
    }
    await newAds.save();

    return responseHandler(HttpCode.OK, MESSAGES.CREATE_ADS_SUCCESS, newAds, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { body, file } = req;

    const { isSuccess, data: response, httpCode, message } = await checkExist(req, res);
    if (!isSuccess) {
      return responseHandler(httpCode, message, response, true)(req, res);
    }

    if (file) {
      body.thumbnail = await cloudinaryUploadSingle(file, {
        ...(response?.thumbnail?.id ? { public_id: response.thumbnail.id } : { folder: "ads" }),
      });
    }

    await response.updateOne(body);
    return responseHandler(HttpCode.OK, MESSAGES.UPDATE_ADS_SUCCESS, undefined, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};
const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await Ads.findById(id);
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.ADS_NOT_EXIST, true)(req, res);
    }
    if (response?.thumbnail?.id) {
      await cloudinaryDestroy(response.thumbnail.id);
    }

    await response.deleteOne();

    return responseHandler(HttpCode.OK, MESSAGES.DELETE_ADS_SUCCESS, undefined, true)(req, res);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default {
  getList,
  getDetail,
  create,
  update,
  deleteOne,
};
