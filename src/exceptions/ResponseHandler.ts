import { Request, Response } from "express";

import { logger } from "@configs/logging";

const responseHandler =
  (httpCode: number, msg?: string, successData?: any, isJson?: boolean) =>
  (_req: Request, res: Response) => {
    if (isJson) {
      return {
        httpCode,
        isSuccess: true,
        ...(msg && { message: msg }),
        ...(successData && { data: successData }),
      };
    }
    logger.info(`${httpCode}: ${msg}`);

    return res.status(httpCode).json({
      httpCode,
      isSuccess: true,
      ...(msg && { message: msg }),
      ...(successData && { data: successData }),
    });
  };

export default responseHandler;

// responseHandler(response.httpCode, response.message, response.data)(req, res);
