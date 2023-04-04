import { Request, Response } from "express";

import authService from "@services/authService";
import responseHandler from "@exceptions/ResponseHandler";
import { HttpCode } from "@constants/enum";
import errorHandler from "@exceptions/ErrorHandler";

// import nodeMailerConfig from "@/configs/nodeMailer";
// import ResetPassword from "@/views/resetPassword";

const GET_ME_CONTROLLER = async (req: Request, res: Response) => {
  try {
    responseHandler(HttpCode.OK, undefined, req.user)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const LOGIN_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.login(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const REGISTER_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.register(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const UPDATE_PROFILE_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.updateProfile(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

// chua test
const FORGOT_PASSWORD_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.forgotPassword(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const RESET_PASSWORD_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.resetPassword(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const CHANGE_PASSWORD = async (req: Request, res: Response) => {
  try {
    const response = await authService.changePassword(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

export default {
  GET_ME_CONTROLLER,
  LOGIN_CONTROLLER,
  REGISTER_CONTROLLER,
  RESET_PASSWORD_CONTROLLER,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD_CONTROLLER,
  UPDATE_PROFILE_CONTROLLER,
};
