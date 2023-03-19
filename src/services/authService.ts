import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import { HttpCode } from "@constants/enum";
import { AppError } from "@exceptions/AppError";
import MESSAGES from "@constants/messages";
import User from "@models/UserModel";
import { comparePasswordFC } from "@utils/functions";
import { IUser } from "@interfaces/userType";

export const login = async (req: Request, _res: Response, next: NextFunction) => {
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

    next();
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      description: MESSAGES.UNAUTHORIZED,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.email = body.email.trim();
    body.userName = body.userName.trim();

    const findByUser = await User.findOne({
      $or: [{ email: body.email }, { userName: body.userName }],
    });

    if (findByUser) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: MESSAGES.ACCOUNT_EXIST,
      });
    }

    const newUser: HydratedDocument<IUser> = new User(body);

    await newUser.save();

    res.status(HttpCode.OK).json({
      message: MESSAGES.REGISTER_SUCCESS,
    });
  } catch (error) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: MESSAGES.SERVER_ERROR,
    });
  }
};
