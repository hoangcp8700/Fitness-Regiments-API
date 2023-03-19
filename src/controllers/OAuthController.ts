// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Request, Response } from "express";

// import ROUTES_CONSTANTS from "@/routes/variables";
// import User from "@/services/user/model";
// import { ProfileSocialPassPort } from "@/configs/passport";
// import { MESSAGES } from "@/constants";
// import { createToken } from "@/utils/jwt";

// const RedirectRequest = (
//   provider: keyof typeof ROUTES_CONSTANTS.OAUTH,
//   accessToken: string,
//   providerID: string,
//   email: string,
//   id: string,
// ): string => {
//   const token = createToken({ id, email });
//   return `${
//     ROUTES_CONSTANTS.OAUTH[provider as keyof typeof ROUTES_CONSTANTS.OAUTH].SUCCESS
//   }?ppT=${accessToken}&ppId=${providerID}&clientT=${token}&end=true`;
// };

// const OAuthRequest = async (profile: ProfileSocialPassPort) => {
//   const { providerName, providerID, accessToken, ...restBody } = profile;
//   const currentUser = await User.findOne({ email: restBody.email }).exec();

//   // create user and create social
//   if (!currentUser) {
//     return new User({
//       ...restBody,
//       socials: [{ providerName, providerID }],
//     }).save();
//   }
//   // have account and have connect socials
//   if (currentUser && currentUser?.socials && currentUser.socials.length) {
//     const checkExistsSocial = currentUser.socials.findIndex(
//       (ele) => ele.providerName === providerName,
//     );
//     if (checkExistsSocial === -1) {
//       return currentUser.updateOne({ $push: { socials: { providerName, providerID } } }).exec();
//     }
//   }
//   // have account and but not have connect socials
//   await currentUser.updateOne({ socials: [{ providerName, providerID }] }).exec();
//   return currentUser;
// };

// const GOOGLE_CALLBACK = async (req: Request, res: Response) => {
//   try {
//     const user = req.user as any;
//     const newUser = await OAuthRequest(user);
//     const result = RedirectRequest(
//       "GOOGLE",
//       user?.accessToken,
//       user?.providerID,
//       user?.email,
//       newUser._id,
//     );

//     res.redirect(result);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const GITHUB_CALLBACK = async (req: Request, res: Response) => {
//   try {
//     const user = req.user as any;
//     const newUser = await OAuthRequest(user);
//     const result = RedirectRequest(
//       "GITHUB",
//       user?.accessToken,
//       user?.providerID,
//       user?.email,
//       newUser._id,
//     );

//     res.redirect(result);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const FACEBOOK_CALLBACK = async (req: Request, res: Response) => {
//   try {
//     const user = req.user as any;
//     const newUser = await OAuthRequest(user);
//     const result = RedirectRequest(
//       "FACEBOOK",
//       user?.accessToken,
//       user?.providerID,
//       user?.email,
//       newUser._id,
//     );

//     res.redirect(result);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// const LOGOUT = async (req: Request, res: Response) => {
//   try {
//     req.logout(() => {});
//     if (req.session) {
//       req.session.destroy(() => {});
//     }
//     res.status(200).json({
//       message: MESSAGES.LOGOUT_SUCCESS,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// export default {
//   GOOGLE_CALLBACK,
//   GITHUB_CALLBACK,
//   FACEBOOK_CALLBACK,
//   LOGOUT,
// };
