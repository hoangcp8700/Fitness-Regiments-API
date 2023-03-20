import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import parseToken from "@/utils/jwt";
import MESSAGES from "@/constants/messages";
import { AppError } from "@exceptions/AppError";
import { HttpCode } from "@constants/enum";

const verifyToken = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const headerAuthorization = req.headers.authorization;
    if (headerAuthorization) {
      const token = headerAuthorization.split(" ")[1];
      const decoded = parseToken(token) as JwtPayload;
      req.userID = decoded.id;
      next();
    }
    throw new AppError({
      httpCode: HttpCode.NO_TOKEN,
      description: MESSAGES.NO_TOKEN_PROVIDE,
    });
  } catch (error: any) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: error.message,
    });
  }
};

// const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await User.findOne({ _id: req.userID, role: "admin" }).exec();
//     req.isAdmin = Boolean(result);
//     next();
//   } catch (error) {
//     res.status(401).json({
//       message: "Unauthorized",
//       error,
//     });
//   }
// };

// const checkUserExistByID = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userID = new mongoose.Types.ObjectId(req?.userID || req?.params?.id);
//     User.aggregate(
//       [
//         { $match: { _id: userID } },
//         {
//           $project: {
//             password: 0,
//           },
//         },
//       ],
//       (error: any, user: IUser[]) => {
//         if (!user || error) {
//           return res.status(404).json({
//             message: MESSAGES.USER_NOT_EXIST,
//           });
//         }
//         req.userInfo = user[0];
//         return next();
//       },
//     );
//   } catch (error) {
//     res.status(401).json({
//       message: "Unauthorized",
//       error,
//     });
//   }
// };

// const roleAccess = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req?.userID).exec();

//     if (!user?.isVerify && user?.role !== "admin") {
//       return res.status(401).json({
//         message: MESSAGES.VERIFY_ERROR,
//       });
//     }
//     return next();
//   } catch (error) {
//     return res.status(401).json({
//       message: MESSAGES.VERIFY_ERROR,
//       error,
//     });
//   }
// };

export default {
  verifyToken,
  // verifyTokenNoRequired,
  // checkUserExistByID,
  // roleAccess,
  // isAdmin,
};
