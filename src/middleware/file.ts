import { NextFunction, Request, Response } from "express";

import { CONFIG } from "@configs";
import { HttpCode } from "@constants/enum";
import { VALIDATE_MESSAGE } from "@constants/messages";
import errorHandler from "@exceptions/ErrorHandler";

export const checkFileIsImage =
  (isRequired = true) =>
  (req: Request, res: Response, next: NextFunction) => {
    const image = req.file;
    if (!isRequired && !image) {
      return next();
    }
    if (!image) {
      return errorHandler(HttpCode.BAD_REQUEST, VALIDATE_MESSAGE.FILE_REQUIRED)(req, res);
    }

    const allowSize = 2;

    const fileExtension = image.originalname.slice(
      // eslint-disable-next-line no-bitwise
      ((image.originalname.lastIndexOf(".") - 1) >>> 0) + 2,
    );

    if (!CONFIG.imgExtensions.includes(fileExtension)) {
      return errorHandler(
        HttpCode.BAD_REQUEST,
        VALIDATE_MESSAGE.INVALID_FILE(CONFIG.imgExtensions.toString()),
      )(req, res);
    }

    if (image.size / (1024 * 1024) > allowSize) {
      return errorHandler(HttpCode.BAD_REQUEST, VALIDATE_MESSAGE.FILE_TOO_LARGE)(req, res);
    }
    return next();
  };
