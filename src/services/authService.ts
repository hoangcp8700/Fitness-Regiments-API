import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import { HttpCode } from "@constants/enum";
import MESSAGES from "@constants/messages";
import User from "@models/UserModel";
import { comparePasswordFC } from "@utils/functions";
import { IUser } from "@interfaces/userType";
import errorHandler from "@exceptions/ErrorHandler";
import responseHandler from "@exceptions/ResponseHandler";
import { createToken } from "@utils/jwt";

const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const userNameTrim = userName.trim();
    const user = await User.findByUsername({ userName: userNameTrim });

    if (!user) {
      return errorHandler(HttpCode.NOT_FOUND, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }

    const checkPassword = comparePasswordFC(user.password, password);

    if (!checkPassword) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.PASSWORD_INVALID, true)(req, res);
    }

    const token = createToken({ id: user._id, email: user.email });

    return responseHandler(
      HttpCode.OK,
      MESSAGES.LOGIN_SUCCESS,
      {
        accessToken: token,
      },
      true,
    )(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
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
