// import passport from "passport";
// import express from "express";

// import ROUTES_CONSTANTS from "@app/routes/variables";

// import controller from "@/controllers/oa";

// const router = express.Router();

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// router.get("/github", passport.authenticate("github", { scope: ["profile", "email"] }));
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", {
//     scope: ["email", "public_profile", "user_birthday", "user_gender"],
//   }),
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: ROUTES_CONSTANTS.OAUTH.GOOGLE.FAILED,
//   }),
//   controller.GOOGLE_CALLBACK,
// );

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     failureRedirect: ROUTES_CONSTANTS.OAUTH.GITHUB.FAILED,
//   }),
//   controller.GITHUB_CALLBACK,
// );

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: ROUTES_CONSTANTS.OAUTH.FACEBOOK.FAILED,
//   }),
//   controller.FACEBOOK_CALLBACK,
// );

// router.get("/logout", controller.LOGOUT);

// export default router;
