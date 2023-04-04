import { Request, Response } from "express";

import {
  cloudinaryUploadMultiple,
  FileMulter,
  cloudinaryDestroyMultiple,
} from "@/configs/cloudinary";
import Exercise from "@models/ExerciseModel";
import { paginateOptions } from "@utils/paginate";
import errorHandler from "@exceptions/ErrorHandler";
import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import MESSAGES from "@constants/messages";
import Category from "@models/CategoryModel";
import { ThumbnailType } from "@interfaces/base";

const getList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const options = paginateOptions({ page, limit });

    const response = await Exercise.paginate({}, options, (err, result) => {
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

    const response = await Exercise.findById(id).exec();
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.EXERCISE_NOT_EXIST, true)(req, res);
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
      response = await Exercise.findById(id);
      if (!response) {
        return errorHandler(HttpCode.NOT_FOUND, MESSAGES.EXERCISE_NOT_EXIST, true)(req, res);
      }
    }

    // validate category
    // add condition because method patch allow not pass field categoryID
    if (body.categoryID) {
      const existCategory = await Category.findById(body.categoryID);
      if (!existCategory) {
        return errorHandler(HttpCode.NOT_FOUND, MESSAGES.CATEGORY_NOT_EXIST, true)(req, res);
      }
    }

    // for validate
    const existRes = await Exercise.findOne({
      $or: [{ slug: body.slug }, { name: body.name }],
    });

    if (existRes) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.NAME_SLUG_EXERCISE_EXIST, true)(req, res);
    }

    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { files, body, userID } = req;

    const response = await checkExist(req, res);
    if (!response.isSuccess) {
      return responseHandler(response.httpCode, response.message, response.data, true)(req, res);
    }

    const newExercise = new Exercise({
      ...body,
      createdBy: userID,
    });

    if (files && files.length) {
      newExercise.images = await cloudinaryUploadMultiple(files as FileMulter[], {
        folder: "exercise",
      });
    }

    await newExercise.save();

    return responseHandler(
      HttpCode.OK,
      MESSAGES.CREATE_EXERCISE_SUCCESS,
      newExercise,
      true,
    )(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { body, files } = req;

    const { isSuccess, data: response, httpCode, message } = await checkExist(req, res);
    if (!isSuccess) {
      return responseHandler(httpCode, message, response, true)(req, res);
    }
    // NOTE: listPublicID is list id image to delete in cloudinary
    if (body?.listPublicID?.length > 0 && response?.images.length > 0) {
      await cloudinaryDestroyMultiple(body.listPublicID);
      body.images = response?.images?.filter(
        (ele: ThumbnailType) => !body.listPublicID.includes(ele.id),
      );
    }

    if (files && files.length) {
      const resultCloudinary = await cloudinaryUploadMultiple(files as FileMulter[], {
        folder: "exercise",
      });
      // NODE: lấy thumbnail list đã filter
      if (body?.listPublicID?.length > 0) {
        body.images = [...body.images, ...resultCloudinary];
      } else {
        // NODE: lấy thumbnail list trước đó ở DB
        const imagesOld = response?.images as ThumbnailType[];
        body.images = [...imagesOld, ...resultCloudinary];
      }
    }

    await response.updateOne(body);
    return responseHandler(
      HttpCode.OK,
      MESSAGES.UPDATE_EXERCISE_SUCCESS,
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

    const response = await Exercise.findById(id);
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.EXERCISE_NOT_EXIST, true)(req, res);
    }

    if (response?.images && response.images.length > 0) {
      const listPublicID = response.images.map((ele: ThumbnailType) => ele.id);
      cloudinaryDestroyMultiple(listPublicID);
    }

    await response.deleteOne();

    // NOTE: update later relationship
    // response.remove();

    return responseHandler(
      HttpCode.OK,
      MESSAGES.DELETE_EXERCISE_SUCCESS,
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
