import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import { HttpCode } from "@constants/enum";
import { AppError } from "@exceptions/AppError";
import MESSAGES from "@constants/messages";
import User from "@models/UserModel";
import { comparePasswordFC } from "@utils/functions";
import { IUser } from "@interfaces/userType";
import errorHandler from "@exceptions/ErrorHandler";
import responseHandler from "@exceptions/ResponseHandler";

const login = async (req: Request) => {
  try {
    const { userName, password } = req.body;
    const userNameRegex = userName.trim();
    const user = await User.findOne({
      $or: [{ email: userNameRegex }, { userName: userNameRegex }],
    });

    if (!user) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: MESSAGES.USER_NOT_EXIST,
      });
    }
    const checkPassword = comparePasswordFC(user.password, password);

    if (!checkPassword) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: MESSAGES.PASSWORD_INVALID,
      });
    }

    return user;
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      description: MESSAGES.UNAUTHORIZED,
    });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.email = body.email.trim();
    body.userName = body.userName.trim();

    const findByUser = await User.findByUsername({ email: body.email, userName: body.userName });

    if (findByUser) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.ACCOUNT_EXIST, true)(req, res);
    }

    const newUser: HydratedDocument<IUser> = new User(body);

    await newUser.save();

    return responseHandler(200, MESSAGES.REGISTER_SUCCESS, newUser, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

export default {
  login,
  register,
};
