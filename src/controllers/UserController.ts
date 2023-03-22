import { Request, Response } from "express";

// import { paginationPipeLine } from "@/utils/functions";
import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
import errorHandler from "@exceptions/ErrorHandler";
import userService from "@services/userService";
// import { IUser } from "@interfaces/userType";

const GET_USER_LIST_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await userService.getList(req, res);
    responseHandler(response.httpCode, response.message, response.data)(req, res);
  } catch (error: any) {
    errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

// const GET_DETAIL_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     res.status(200).json({ data: req.userInfo });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };
// const GET_LIST_USER_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     const response = await User.find();
//     responseHandler(HttpCode.OK, undefined, response)(req, res);
//   } catch (error: any) {
//     errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
//   }
// };

// const UPDATE_CONTROLLER = async (_req: Request, res: Response) => {
//   try {
//     // const { userID } = req;
//     // User.findByIdAndUpdate(userID, { $set: req.body }, { new: true }, (err: any, result: IUser) => {
//     //   if (err) {
//     //     return res.status(404).json({
//     //       message: MESSAGES.USER_NOT_EXIST,
//     //     });
//     //   }
//     //   return res.status(200).json({
//     //     data: result,
//     //     message: MESSAGES.UPDATE_USER_SUCCESS,
//     //   });
//     // });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const DELETE_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     const userID = req.params.id;

//     User.deleteOne({ _id: userID });

//     res.status(200).json({
//       message: MESSAGES.DELETE_USER_SUCCESS,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

export default {
  // GET_USER_LIST_CONTROLLER,
  // GET_DETAIL_CONTROLLER,
  GET_USER_LIST_CONTROLLER,
  // UPDATE_CONTROLLER,
  // DELETE_CONTROLLER,
};
