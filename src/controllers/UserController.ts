import { Request, Response } from "express";

// import { paginationPipeLine } from "@/utils/functions";
import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import errorHandler from "@exceptions/ErrorHandler";
import userService from "@services/userService";
// import { IUser } from "@interfaces/userType";

const GET_USER_LIST_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await userService.getList(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const GET_DETAIL_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await userService.getDetail(req, res);
    responseHandler(HttpCode.OK, undefined, response)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const UPDATE_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await userService.update(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const DELETE_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await userService.deleteOne(req, res);
    responseHandler(response.httpCode, response.message, undefined)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

export default {
  GET_DETAIL_CONTROLLER,
  GET_USER_LIST_CONTROLLER,
  UPDATE_CONTROLLER,
  DELETE_CONTROLLER,
};
