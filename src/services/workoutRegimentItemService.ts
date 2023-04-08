import { Request, Response } from "express";

import WorkoutRegimentItem from "@models/WorkoutRegimentItemModel";
import errorHandler from "@exceptions/ErrorHandler";
import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import MESSAGES from "@constants/messages";
import WorkoutRegiment from "@models/WorkoutRegimentModel";

const checkExist = async (req: Request, res: Response) => {
  try {
    const { id, itemID } = req.params;

    const responseParent = await WorkoutRegiment.findById(id);
    if (!responseParent) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.WORKOUT_REGIMENT_NOT_EXIST, true)(req, res);
    }

    let response;
    if (itemID) {
      // FOR UPDATE
      response = await WorkoutRegimentItem.findById(itemID);
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

const getList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const responseExist = await checkExist(req, res);
    if (!responseExist.isSuccess) {
      return responseHandler(
        responseExist.httpCode,
        responseExist.message,
        responseExist.data,
        true,
      )(req, res);
    }

    const response = await WorkoutRegimentItem.find({ workoutID: id });

    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const getDetail = async (req: Request, res: Response) => {
  try {
    const { isSuccess, data: response, httpCode, message } = await checkExist(req, res);
    if (!isSuccess) {
      return responseHandler(httpCode, message, response, true)(req, res);
    }

    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const createOneOrMany = async (req: Request, res: Response) => {
  try {
    const { params, body } = req;

    const responseExist = await checkExist(req, res);
    if (!responseExist.isSuccess) {
      return responseHandler(
        responseExist.httpCode,
        responseExist.message,
        responseExist.data,
        true,
      )(req, res);
    }

    if (Array.isArray(body)) {
      const newRecords = body.map((record) => ({ ...record, workoutID: params.id }));
      const response = await WorkoutRegimentItem.create(newRecords);
      return responseHandler(
        HttpCode.OK,
        MESSAGES.CREATE_WORKOUT_REGIMENT_SUCCESS,
        response,
        true,
      )(req, res);
    }

    const newCategory = new WorkoutRegimentItem({
      ...body,
      workoutID: params.id,
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
const deleteOneOrMany = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const { isSuccess, data: response, httpCode, message } = await checkExist(req, res);
    if (!isSuccess) {
      return responseHandler(httpCode, message, response, true)(req, res);
    }

    if (Array.isArray(body)) {
      await WorkoutRegimentItem.deleteMany({ _id: { $in: body } });
      return responseHandler(
        HttpCode.OK,
        MESSAGES.DELETE_WORKOUT_REGIMENT_SUCCESS,
        response,
        true,
      )(req, res);
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
  createOneOrMany,
  update,
  deleteOneOrMany,
};
