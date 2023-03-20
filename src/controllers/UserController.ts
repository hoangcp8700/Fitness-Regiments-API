import { Request, Response } from "express";

// import { paginationPipeLine } from "@/utils/functions";
import User from "@/models/UserModel";
import { HttpCode } from "@constants/enum";
import responseHandler from "@exceptions/ResponseHandler";
// import { IUser } from "@interfaces/userType";

// const GET_USER_LIST_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     const { page = 1, limit = 2 } = req.query;

//     const paginateOptions = {
//       page: Number(page),
//       limit: Number(limit),
//     };

//     const users = await User.aggregate(
//       paginationPipeLine<IUserDocument>(paginateOptions, {}, [
//         {
//           $project: {
//             password: 0,
//           },
//         },
//         {
//           $sort: {
//             createdAt: -1,
//           },
//         },
//       ]),
//     ).exec();

//     res.status(200).json({ data: users });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const GET_DETAIL_CONTROLLER = async (req: Request, res: Response) => {
//   try {
//     res.status(200).json({ data: req.userInfo });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };
const GET_LIST_USER_CONTROLLER = async (req: Request, res: Response) => {
  try {
    const response = await User.find();
    responseHandler(HttpCode.OK, undefined, response)(req, res);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

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
  GET_LIST_USER_CONTROLLER,
  // UPDATE_CONTROLLER,
  // DELETE_CONTROLLER,
};
