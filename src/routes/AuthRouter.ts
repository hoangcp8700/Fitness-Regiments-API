import express from "express";

import controller from "@/controllers/AuthController";
import validateRequestBody from "@middleware/validate";
import authValidate from "@validators/authValidate";
// import errorHandler from "@exceptions/ErrorHandler";

const router = express.Router();

// router.get(
//   "/user",
//   [middleware.verifyToken, middleware.checkUserExistByID],
//   controller.GET_USER_CONTROLLER,
// );
// router.get(
//   "/users",
//   [middleware.verifyToken, middleware.roleAccess],
//   UserController.GET_USER_LIST_CONTROLLER,
// );
// router.patch("/user", [middleware.verifyToken], UserController.UPDATE_CONTROLLER);

router.post("/login", controller.LOGIN_CONTROLLER);
router.post(
  "/register",
  validateRequestBody(authValidate.registerSchema),
  controller.REGISTER_CONTROLLER,
);
// router.post("/forgot-password", controller.FORGOT_PASSWORD_CONTROLLER);
// router.post("/reset-password", [middleware.verifyToken], controller.RESET_PASSWORD_CONTROLLER);
// router.patch("/change-password", [middleware.verifyToken], controller.CHANGE_PASSWORD);
export default router;
