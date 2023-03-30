import passport from "passport";
import express from "express";

import controller from "@/controllers/OAuthController";

import ROUTES_CONSTANTS from "./path";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile", "user_birthday", "user_gender"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: ROUTES_CONSTANTS.OAUTH.GOOGLE.FAILED,
  }),
  controller.GOOGLE_CALLBACK_CONTROLLER,
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: ROUTES_CONSTANTS.OAUTH.FACEBOOK.FAILED,
  }),
  controller.FACEBOOK_CALLBACK_CONTROLLER,
);

router.get("/logout", controller.LOGOUT_CONTROLLER);

export default router;
