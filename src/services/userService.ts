import { Request, Response } from "express";

import errorHandler from "@exceptions/ErrorHandler";
import responseHandler from "@exceptions/ResponseHandler";
import User from "@models/UserModel";
import { HttpCode } from "@constants/enum";
import { paginateOptions } from "@utils/paginate";

const getList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const options = paginateOptions({ page, limit });

    const response = await User.paginate({}, options, (err, result) => {
      if (err) {
        return errorHandler(HttpCode.BAD_REQUEST, err.message, true)(req, res);
      }
      return result;
    });

    return responseHandler(200, undefined, response, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

export default {
  getList,
};
