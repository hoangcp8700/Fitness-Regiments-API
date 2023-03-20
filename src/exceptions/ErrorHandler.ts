import { Request, Response } from "express";

import { HttpCode } from "@constants/enum";
import { logger } from "@configs/logging";

const errorHandler =
  (httpCode: HttpCode, msg: string, isJson?: boolean) => (_req: Request, res: Response) => {
    if (isJson) {
      return {
        httpCode,
        message: msg,
        isSuccess: false,
      };
    }
    logger.error(`${httpCode}: ${msg}`);

    return res.status(httpCode).json({
      httpCode,
      message: msg,
      isSuccess: false,
    });
  };

export default errorHandler;

//  errorHandler(HttpCode.BAD_REQUEST, MESSAGES.ACCOUNT_EXIST)(req, res);
// return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.ACCOUNT_EXIST, true)(req, res);
