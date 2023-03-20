import { Request, Response } from "express";

import { createToken } from "@/utils/jwt";
import authService from "@services/authService";
import MESSAGES from "@constants/messages";
import responseHandler from "@exceptions/ResponseHandler";
import { AppError } from "@exceptions/AppError";
import { HttpCode } from "@constants/enum";
import errorHandler from "@exceptions/ErrorHandler";

// import nodeMailerConfig from "@/configs/nodeMailer";
// import ResetPassword from "@/views/resetPassword";

// const GET_USER_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     res.status(200).json({ data: req.userInfo });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

const LOGIN_CONTROLLER = async (req: Request) => {
  try {
    const response = await authService.login(req);

    const token = createToken({ id: response._id, email: response.email });

    responseHandler(200, MESSAGES.LOGIN_SUCCESS, {
      accessToken: token,
    });
  } catch (error: any) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: error.message,
    });
  }
};

const REGISTER_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.register(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.BAD_REQUEST, error.message)(req, res);
  }
};

// const FORGOT_PASSWORD_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOneAndUpdate(
//       { email },
//       { $set: { updatedAt: Date.now() } },
//       { new: true, select: "firstName lastName email password updatedAt" },
//     ).exec();

//     if (!user) {
//       return res.status(404).send({
//         message: {
//           vi: CONSTANTS.USER_NOT_EXIST.VI,
//           en: CONSTANTS.USER_NOT_EXIST.EN,
//         },
//       });
//     }
//     const code = createCode(user.updatedAt);
//     const token = createToken({ id: user._id, email: user.email, password: user.password });

//     const mailOptions = {
//       to: email,
//       subject: "Thay đổi mật khẩu",
//       text: "Chúng tôi nhận được yêu cầu đổi mật khẩu từ bạn!",
//       html: ResetPassword({
//         url: CONFIG.urlClient || "",
//         fullName: user.getFullName() || "bạn",
//         token,
//         code,
//       }),
//     };

//     await nodeMailerConfig(mailOptions);

//     return res.status(200).json({
//       message: {
//         vi: CONSTANTS.FORGOT_PASSWORD_SUCCESS.VI,
//         en: CONSTANTS.FORGOT_PASSWORD_SUCCESS.EN,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };

// const RESET_PASSWORD_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     const { userID } = req;
//     const { code, password } = req.body;

//     const user = await User.findById(userID).select("password, updatedAt").exec();

//     if (user) {
//       const isVerifyCode = verifyCode(user.updatedAt, code);
//       if (!isVerifyCode) {
//         return res.status(404).send({
//           message: {
//             vi: CONSTANTS.CODE_INVALID.VI,
//             en: CONSTANTS.CODE_INVALID.EN,
//           },
//         });
//       }

//       await user
//         .updateOne({
//           password: user.hashPassword(password),
//         })
//         .exec();

//       return res.status(200).json({
//         message: {
//           vi: CONSTANTS.RESET_PASSWORD_SUCCESS.VI,
//           en: CONSTANTS.RESET_PASSWORD_SUCCESS.EN,
//         },
//       });
//     }
//     return res.status(404).send({
//       message: {
//         vi: CONSTANTS.USER_NOT_EXIST.VI,
//         en: CONSTANTS.USER_NOT_EXIST.EN,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };

// const CHANGE_PASSWORD = async (req: Request, res: Response) => {
//   try {
//     const { passwordCurrent, password } = req.body;
//     const { userID } = req;

//     const user = await User.findById(userID).select("password").exec();

//     if (user) {
//       const checkPassword = user.comparePassword(passwordCurrent);

//       if (!checkPassword) {
//         return res.status(404).send({
//           message: {
//             vi: CONSTANTS.PASSWORD_INVALID.VI,
//             en: CONSTANTS.PASSWORD_INVALID.EN,
//           },
//         });
//       }

//       await user
//         .updateOne({
//           password: user.hashPassword(password),
//         })
//         .exec();

//       return res.status(200).json({
//         message: {
//           vi: CONSTANTS.CHANGE_PASSWORD_SUCCESS.VI,
//           en: CONSTANTS.CHANGE_PASSWORD_SUCCESS.EN,
//         },
//       });
//     }
//     return res.status(404).send({
//       message: {
//         vi: CONSTANTS.USER_NOT_EXIST.VI,
//         en: CONSTANTS.USER_NOT_EXIST.EN,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };

export default {
  // GET_USER_CONTROLLER,
  LOGIN_CONTROLLER,
  REGISTER_CONTROLLER,
  // FORGOT_PASSWORD_CONTROLLER,
  // RESET_PASSWORD_CONTROLLER,
  // CHANGE_PASSWORD,
};
