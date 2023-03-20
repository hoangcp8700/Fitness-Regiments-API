import { Request, Response } from "express";

import { HttpCode } from "@constants/enum";

const errorHandler =
  (httpCode: HttpCode, msg: string, isJson?: boolean) => (_req: Request, res: Response) => {
    return isJson
      ? {
          httpCode,
          message: msg,
          isSuccess: false,
        }
      : res.status(httpCode).json({
          httpCode,
          message: msg,
          isSuccess: false,
        });
  };

export default errorHandler;

//  errorHandler(HttpCode.BAD_REQUEST, MESSAGES.ACCOUNT_EXIST)(req, res);
