import { Request, Response } from "express";

import errorHandler from "@exceptions/ErrorHandler";
import responseHandler from "@exceptions/ResponseHandler";
import User from "@models/UserModel";
import { HttpCode } from "@constants/enum";
import { paginateOptions } from "@utils/paginate";
import MESSAGES from "@constants/messages";

const getList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const options = paginateOptions({ page, limit });

    const response = await User.paginate({}, options, (err, result) => {
      if (err) {
        return errorHandler(HttpCode.BAD_REQUEST, err.message, true)(req, res);
      }
      return result;
    });

    return responseHandler(HttpCode.OK, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

const getDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await User.findById(id).exec();
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }
    return response;
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    // const { body, params, files } = req; // listPublicID: ['publicID1', 'publicID2'] // xóa thumbnail
    const { body, params } = req; // listPublicID: ['publicID1', 'publicID2'] // xóa thumbnail
    const { id } = params;

    const response = await User.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }
    return responseHandler(HttpCode.OK, MESSAGES.UPDATE_USER_SUCCESS, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

const deleteOne = async (req: Request, res: Response) => {
  try {
    // const { body, params, files } = req; // listPublicID: ['publicID1', 'publicID2'] // xóa thumbnail
    const { id } = req.params;

    const response = await User.findByIdAndDelete(id);
    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }
    return responseHandler(HttpCode.OK, MESSAGES.DELETE_USER_SUCCESS, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

export default {
  getList,
  getDetail,
  update,
  deleteOne,
};
