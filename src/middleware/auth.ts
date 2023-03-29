import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

import parseToken from "@/utils/jwt";
import MESSAGES from "@/constants/messages";
import { HttpCode, RoleType } from "@constants/enum";
import User from "@models/UserModel";
import errorHandler from "@exceptions/ErrorHandler";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerAuthorization = req.headers.authorization;
    if (headerAuthorization) {
      const token = headerAuthorization.split(" ")[1];
      const decoded = parseToken(token) as JwtPayload;
      req.userID = decoded.id;
      return next();
    }
    return errorHandler(HttpCode.NO_TOKEN, MESSAGES.NO_TOKEN_PROVIDE)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const isAdmin =
  (isResponse?: boolean) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userID } = req;
      const user = await User.findById(userID).exec();
      if (!user || user.role === RoleType.User) {
        if (!isResponse) {
          return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.NO_PERMISSION)(req, res);
        }
        req.isAdmin = false;
      } else {
        req.isAdmin = true;
      }

      return next();
    } catch (error) {
      return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR)(req, res);
    }
  };

const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userID } = req;
    const user = await User.findById(userID).exec();
    if (!user || user.role !== RoleType.Supper) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.NO_PERMISSION)(req, res);
    }

    return next();
  } catch (error) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR)(req, res);
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userID } = req;
    const id = new mongoose.Types.ObjectId(userID);

    const response = await User.findById(id).exec();

    if (!response) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.USER_NOT_EXIST)(req, res);
    }

    req.user = response;
    next();
  } catch (error) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, MESSAGES.SERVER_ERROR)(req, res);
  }
};

const authMiddleware = {
  verifyToken,
  getMe,
  isAdmin,
  isSuperAdmin,
};

export default authMiddleware;
