import { Request, Response } from "express";

import { HttpCode } from "@constants/enum";
import MESSAGES from "@constants/messages";
import User from "@models/UserModel";
import { comparePasswordFC } from "@utils/functions";
import errorHandler from "@exceptions/ErrorHandler";
import responseHandler from "@exceptions/ResponseHandler";
import { createToken } from "@utils/jwt";
import ResetPasswordView from "@views/resetPassword";
import { CONFIG } from "@configs";
import nodeMailerConfig from "@configs/nodeMailer";
import Otp from "@models/OtpModel";

import otpService from "./otpService";

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

    const newUser = new User(body);

    await newUser.save();

    return responseHandler(HttpCode.OK, MESSAGES.REGISTER_SUCCESS, newUser, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { passwordCurrent, password } = req.body;
    const { userID } = req;

    const user = await User.findById(userID).select("password").exec();

    if (!user) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }

    const checkPassword = comparePasswordFC(user.password, passwordCurrent);
    if (!checkPassword) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.PASSWORD_INVALID, true)(req, res);
    }

    await user.updateOne({
      password: user.hashPassword(password),
    });

    return responseHandler(
      HttpCode.OK,
      MESSAGES.CHANGE_PASSWORD_SUCCESS,
      undefined,
      true,
    )(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }

    const { otp } = await Otp.createOrUpdateCode(user.id);
    const token = createToken({ id: user._id, email: user.email, password: user.password }, "30m"); // create token with 15 minute

    const mailOptions = {
      to: email,
      subject: "Thay đổi mật khẩu",
      text: "Chúng tôi nhận được yêu cầu đổi mật khẩu từ bạn!",
      html: ResetPasswordView({
        url: CONFIG.urlClient || "",
        fullName: user.nickName || user.fullName || "bạn",
        token,
        code: otp,
      }),
    };

    await nodeMailerConfig(mailOptions);

    return responseHandler(
      HttpCode.OK,
      MESSAGES.FORGOT_PASSWORD_SUCCESS,
      undefined,
      true,
    )(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { userID } = req;
    const { password } = req.body;

    const user = await User.findById(userID).select("password, updatedAt").exec();
    if (!user) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }

    // NOTE: handle OTP ---------------------------------
    const response = await otpService.verify(req, res);
    if (!response.isSuccess) {
      return responseHandler(response.httpCode, response.message, response.data, true)(req, res);
    }

    // -----------------------------------------------
    await user.updateOne({
      password: user.hashPassword(password),
    });
    await otpService.deleteCode(req, res);

    return responseHandler(HttpCode.OK, MESSAGES.RESET_PASSWORD_SUCCESS, undefined, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { body, userID } = req;

    const response = await User.findById(userID);
    if (!response) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.USER_NOT_EXIST, true)(req, res);
    }

    await response.updateOne(body);
    return responseHandler(HttpCode.OK, MESSAGES.UPDATE_PROFILE_SUCCESS, undefined, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.BAD_REQUEST, error.message, true)(req, res);
  }
};

export default {
  login,
  register,
  resetPassword,
  forgotPassword,
  changePassword,
  updateProfile,
};
