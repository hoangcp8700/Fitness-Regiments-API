import { Request, Response } from "express";

import authService from "@services/authService";
import responseHandler from "@exceptions/ResponseHandler";
import { HttpCode } from "@constants/enum";
import errorHandler from "@exceptions/ErrorHandler";

// import nodeMailerConfig from "@/configs/nodeMailer";
// import ResetPassword from "@/views/resetPassword";

const GET_ME_CONTROLLER = async (req: Request, res: Response) => {
  try {
    responseHandler(HttpCode.OK, undefined, req.user)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const LOGIN_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.login(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const REGISTER_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.register(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
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

// chua test
const RESET_PASSWORD_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await authService.resetPassword(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const CHANGE_PASSWORD = async (req: Request, res: Response) => {
  try {
    const response = await authService.changePassword(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

export default {
  GET_ME_CONTROLLER,
  LOGIN_CONTROLLER,
  REGISTER_CONTROLLER,
  RESET_PASSWORD_CONTROLLER,
  CHANGE_PASSWORD,
  // FORGOT_PASSWORD_CONTROLLER,
  // RESET_PASSWORD_CONTROLLER,
  // CHANGE_PASSWORD,
};
