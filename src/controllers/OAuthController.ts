import { Request, Response } from "express";

import { HttpCode } from "@constants/enum";
import errorHandler from "@exceptions/ErrorHandler";
import responseHandler from "@exceptions/ResponseHandler";
import oauthService from "@services/oauthService";

const GOOGLE_CALLBACK_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await oauthService.google(req, res);

    if (response.isSuccess) {
      return res.redirect(response.data);
    }
    responseHandler(response.httpCode, response.message, undefined)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const FACEBOOK_CALLBACK_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await oauthService.facebook(req, res);
    if (response.isSuccess) {
      return res.redirect(response.data);
    }
    responseHandler(response.httpCode, response.message, undefined)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const LOGOUT_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await oauthService.logout(req, res);
    responseHandler(response.httpCode, response.message, undefined)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};
export default {
  GOOGLE_CALLBACK_CONTROLLER,
  FACEBOOK_CALLBACK_CONTROLLER,
  LOGOUT_CONTROLLER,
};
