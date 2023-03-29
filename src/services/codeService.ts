import { Request, Response } from "express";

import { HttpCode } from "@constants/enum";
import MESSAGES from "@constants/messages";
import errorHandler from "@exceptions/ErrorHandler";
import Code from "@models/CodeModel";
import responseHandler from "@exceptions/ResponseHandler";

const verify = async (req: Request, res: Response) => {
  try {
    const { userID } = req;
    const { code } = req.body;

    // NOTE: handle OTP ---------------------------------
    const response = await Code.findOne({ createdBy: userID, otp: code });
    if (!response) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.CODE_INVALID, true)(req, res);
    }

    const isExpired = response.isExpired();
    if (isExpired) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.CODE_EXPIRED, true)(req, res);
    }
    // -----------------------------------------------
    return responseHandler(HttpCode.OK, undefined, undefined, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const deleteCode = async (req: Request, res: Response) => {
  try {
    const { userID } = req;
    await Code.deleteOne({ createdBy: userID });
    return responseHandler(HttpCode.OK, undefined, undefined, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

export default {
  verify,
  deleteCode,
};
