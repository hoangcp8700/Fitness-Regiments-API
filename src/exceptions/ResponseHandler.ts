import { Request, Response } from "express";

const responseHandler =
  (statusCode: number, successMsg?: string, successData?: any, isJson?: boolean) =>
  (_req: Request, res: Response) => {
    return isJson
      ? {
          httpCode: statusCode,
          isSuccess: true,
          ...(successMsg && { message: successMsg }),
          ...(successData && { data: successData }),
        }
      : res.status(statusCode).json({
          httpCode: statusCode,
          isSuccess: true,
          ...(successMsg && { message: successMsg }),
          ...(successData && { data: successData }),
        });
  };

export default responseHandler;

//  responseHandler(HttpCode.BAD_REQUEST, MESSAGES.ACCOUNT_EXIST, data)(req, res);
