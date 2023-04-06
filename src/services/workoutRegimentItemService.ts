import { Request, Response } from "express";

import WorkoutRegimentItem from "@models/WorkoutRegimentItemModel";
import { paginateOptions } from "@utils/paginate";
import errorHandler from "@exceptions/ErrorHandler";
import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import MESSAGES from "@constants/messages";

const getList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const options = paginateOptions({ page, limit });

    const response = await WorkoutRegimentItem.paginate({}, options, (err, result) => {
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

    const response = await WorkoutRegimentItem.findById(id).exec();
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.WORKOUT_REGIMENT_NOT_EXIST, true)(req, res);
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
      response = await WorkoutRegimentItem.findById(id);
      if (!response) {
        return errorHandler(
          HttpCode.NOT_FOUND,
          MESSAGES.WORKOUT_REGIMENT_NOT_EXIST,
          true,
        )(req, res);
      }
    }

    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { body, userID } = req;

    const response = await checkExist(req, res);
    if (!response.isSuccess) {
      return responseHandler(response.httpCode, response.message, response.data, true)(req, res);
    }

    const newCategory = new WorkoutRegimentItem({
      ...body,
      createdBy: userID,
    });

    await newCategory.save();

    return responseHandler(
      HttpCode.OK,
      MESSAGES.CREATE_WORKOUT_REGIMENT_SUCCESS,
      newCategory,
      true,
    )(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const { isSuccess, data: response, httpCode, message } = await checkExist(req, res);
    if (!isSuccess) {
      return responseHandler(httpCode, message, response, true)(req, res);
    }

    await response.updateOne(body);
    return responseHandler(
      HttpCode.OK,
      MESSAGES.UPDATE_WORKOUT_REGIMENT_SUCCESS,
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

    const response = await WorkoutRegimentItem.findById(id);
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.WORKOUT_REGIMENT_NOT_EXIST, true)(req, res);
    }

    await response.deleteOne();

    return responseHandler(
      HttpCode.OK,
      MESSAGES.DELETE_WORKOUT_REGIMENT_SUCCESS,
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
