import { Request, Response } from "express";

import { cloudinaryUploadSingle, cloudinaryDestroy } from "@/configs/cloudinary";
import Category from "@models/CategoryModel";
import { paginateOptions } from "@utils/paginate";
import errorHandler from "@exceptions/ErrorHandler";
import { HttpCode, RoleCategoryType } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import MESSAGES from "@constants/messages";

const getList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const options = paginateOptions({ page, limit });

    const response = await Category.paginate({}, options, (err, result) => {
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

    const response = await Category.findById(id).exec();
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.CATEGORY_NOT_EXIST, true)(req, res);
    }
    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const checkExist = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = req.params;

    // FOR UPDATE
    let response;
    if (id) {
      response = await Category.findById(id);
      if (!response) {
        return errorHandler(HttpCode.NOT_FOUND, MESSAGES.CATEGORY_NOT_EXIST, true)(req, res);
      }
    }

    // for validate
    const existRes = await Category.findOne({
      $or: [{ slug: body.slug }, { name: body.name }],
    });

    if (existRes) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.NAME_SLUG_CATEGORY_EXIST, true)(req, res);
    }

    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { file, body, userID, isAdmin } = req;

    const response = await checkExist(req, res);
    if (!response.isSuccess) {
      return responseHandler(response.httpCode, response.message, response.data, true)(req, res);
    }

    const newCategory = new Category({
      ...body,
      createdBy: userID,
      ...(!isAdmin && { role: RoleCategoryType.User }),
    });

    if (file) {
      newCategory.thumbnail = await cloudinaryUploadSingle(file, {
        transformation: {
          width: 128,
          height: 128,
        },
        folder: "categories",
      });
    }
    await newCategory.save();

    return responseHandler(
      HttpCode.OK,
      MESSAGES.CREATE_CATEGORY_SUCCESS,
      newCategory,
      true,
    )(req, res);
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
        transformation: {
          width: 64,
          height: 64,
        },
        ...(response?.thumbnail?.id
          ? { public_id: response.thumbnail.id }
          : { folder: "categories" }),
      });
    }

    await response.updateOne(body);
    return responseHandler(
      HttpCode.OK,
      MESSAGES.UPDATE_CATEGORY_SUCCESS,
      undefined,
      true,
    )(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};
const deleteOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await Category.findById(id);
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.CATEGORY_NOT_EXIST, true)(req, res);
    }
    if (response?.thumbnail?.id) {
      await cloudinaryDestroy(response.thumbnail.id);
    }

    await response.deleteOne();
    // NOTE: update later
    // response.remove();

    return responseHandler(
      HttpCode.OK,
      MESSAGES.DELETE_CATEGORY_SUCCESS,
      undefined,
      true,
    )(req, res);
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
