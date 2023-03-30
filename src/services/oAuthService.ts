/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import { ProfileSocialPassPort } from "@/configs/passport";
import { createToken } from "@/utils/jwt";
import ROUTES_CONSTANTS from "@routes/path";
import User from "@models/UserModel";
import responseHandler from "@exceptions/ResponseHandler";
import { HttpCode } from "@constants/enum";
import errorHandler from "@exceptions/ErrorHandler";
import MESSAGES from "@constants/messages";

const RedirectRequest = (
  provider: keyof typeof ROUTES_CONSTANTS.OAUTH,
  accessToken: string,
  providerID: string,
  email: string,
  id: string,
): string => {
  const token = createToken({ id, email });
  return `${
    ROUTES_CONSTANTS.OAUTH[provider as keyof typeof ROUTES_CONSTANTS.OAUTH].SUCCESS
  }?ppT=${accessToken}&ppId=${providerID}&clientT=${token}&end=true`;
};

const OAuthRequest = async (profile: ProfileSocialPassPort) => {
  const { providerName, providerID, accessToken, ...restBody } = profile;

  const currentUser = await User.findOne({ email: restBody.email });
  // create user and create social
  if (!currentUser) {
    return new User({
      ...restBody,
      socials: [{ providerName, providerID }],
    }).save();
  }

  // have account and have connect socials
  if (currentUser && currentUser?.socials && currentUser.socials.length) {
    const checkExistsSocial = currentUser.socials.findIndex(
      (ele) => ele.providerName === providerName,
    );
    if (checkExistsSocial === -1) {
      return currentUser.updateOne({ $push: { socials: { providerName, providerID } } }).exec();
    }
  }

  // have account and but not have connect socials
  await currentUser.updateOne({ socials: [{ providerName, providerID }] }).exec();
  return currentUser;
};

const google = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const newUser = await OAuthRequest(user);
    const result = RedirectRequest(
      "GOOGLE",
      user?.accessToken,
      user?.providerID,
      user?.email,
      newUser._id,
    );

    return responseHandler(HttpCode.OK, undefined, result, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const facebook = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const newUser = await OAuthRequest(user);
    const result = RedirectRequest(
      "FACEBOOK",
      user?.accessToken,
      user?.providerID,
      user?.email,
      newUser._id,
    );

    return responseHandler(HttpCode.OK, undefined, result, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    // console.log("req.session logout", req.session);
    req.logout(() => {});
    req.session.destroy(() => {});
    return responseHandler(HttpCode.OK, MESSAGES.LOGOUT_SUCCESS, undefined, true)(req, res);
  } catch (error: any) {
    return errorHandler(HttpCode.INTERNAL_SERVER_ERROR, error.message, true)(req, res);
  }
};

export default {
  google,
  facebook,
  logout,
};
