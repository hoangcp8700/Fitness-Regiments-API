import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

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
      next();
    }
    return errorHandler(HttpCode.NO_TOKEN, MESSAGES.NO_TOKEN_PROVIDE)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message)(req, res);
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userID } = req;
    const user = await User.findById(userID);
    if (!user || user.role === RoleType.User) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.NO_PERMISSION, true)(req, res);
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};

const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userID } = req;
    const user = await User.findById(userID);
    if (!user || user.role === RoleType.Supper) {
      return errorHandler(HttpCode.BAD_REQUEST, MESSAGES.NO_PERMISSION, true)(req, res);
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};

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

const authMiddleware = {
  verifyToken,
  isAdmin,
  isSuperAdmin,
  // verifyTokenNoRequired,
  // checkUserExistByID,
  // roleAccess,
  // isAdmin,
};

export default authMiddleware;
