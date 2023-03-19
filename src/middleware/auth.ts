import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { IUser } from "@interfaces/userType";
import parseToken from "@/utils/jwt";
import User from "@/models/UserModel";
import MESSAGES from "@/constants/messages";
import { AppError } from "@exceptions/AppError";
import { HttpCode } from "@constants/enum";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerAuthorization = req.headers.authorization;
    if (headerAuthorization) {
      const token = headerAuthorization.split(" ")[1];
      const decoded = parseToken(token) as JwtPayload;
      req.userID = decoded.id;
      return next();
    }
    return res.status(403).json({
      message: "No token provided",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};
const verifyTokenNoRequired = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerAuthorization = req.headers.authorization;
    if (headerAuthorization) {
      const token = headerAuthorization.split(" ")[1];
      const decoded = parseToken(token) as JwtPayload;
      req.userID = decoded.id;
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await User.findOne({ _id: req.userID, role: "admin" }).exec();
    req.isAdmin = Boolean(result);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};

const checkUserExistByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = new mongoose.Types.ObjectId(req?.userID || req?.params?.id);
    User.aggregate(
      [
        { $match: { _id: userID } },
        {
          $project: {
            password: 0,
          },
        },
      ],
      (error: any, user: IUser[]) => {
        if (!user || error) {
          return res.status(404).json({
            message: MESSAGES.USER_NOT_EXIST,
          });
        }
        req.userInfo = user[0];
        return next();
      },
    );
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};

const loginAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;
    const userNameRegex = userName.trim();
    const user = User.findOne({ email: userNameRegex, userName: userNameRegex });

    if (!user) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: MESSAGES.USER_NOT_EXIST,
      });
    }
    const newUser = new User(user);
    const checkPassword = newUser.comparePassword(password);

    if (!checkPassword) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: MESSAGES.PASSWORD_INVALID,
      });
    }

    // User.aggregate<IUser>(
    //   [
    //     {
    //       $match: {
    //         $or: [{ email: { $in: [userNameRegex] } }, { userName: { $in: [userNameRegex] } }],
    //       },
    //     },
    //   ],
    //   (error: any, user: IUser[]) => {
    //     if (!user.length || error) {
    //       return res.status(404).json({
    //         message: MESSAGES.USER_NOT_EXIST,
    //       });
    //     }
    //     const newUser = new User(user[0]);
    //     const checkPassword = newUser.comparePassword(password);

    //     if (!checkPassword) {
    //       return res.status(404).send({
    //         message: MESSAGES.PASSWORD_INVALID,
    //       });
    //     }

    //     delete user[0]?.password;
    //     req.userInfo = user[0];
    //     return next();
    //   },
    // );
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};

const roleAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req?.userID).exec();

    if (!user?.isVerify && user?.role !== "admin") {
      return res.status(401).json({
        message: MESSAGES.VERIFY_ERROR,
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      message: MESSAGES.VERIFY_ERROR,
      error,
    });
  }
};

export default {
  verifyToken,
  verifyTokenNoRequired,
  checkUserExistByID,
  loginAuthentication,
  roleAccess,
  isAdmin,
};
