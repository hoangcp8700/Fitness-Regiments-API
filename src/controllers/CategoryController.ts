import { Request, Response } from "express";

import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import errorHandler from "@exceptions/ErrorHandler";
import categoryService from "@services/categoryService";

const GET_LIST_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.getList(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const GET_DETAIL_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.getDetail(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const CREATE_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.create(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const UPDATE_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.update(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const DELETE_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await categoryService.deleteOne(req, res);
    responseHandler(response.httpCode, response.message, undefined)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

export default {
  GET_DETAIL_CONTROLLER,
  GET_LIST_CONTROLLER,
  CREATE_CONTROLLER,
  UPDATE_CONTROLLER,
  DELETE_CONTROLLER,
};
