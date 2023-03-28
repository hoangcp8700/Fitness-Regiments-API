import express from "express";

import controller from "@/controllers/AuthController";
import validateRequestBody from "@middleware/validate";
import authValidate from "@validators/authValidate";
import authMiddleware from "@middleware/auth";

const router = express.Router();

router.get("/me", [authMiddleware.verifyToken, authMiddleware.getMe], controller.GET_ME_CONTROLLER);
router.post("/login", validateRequestBody(authValidate.loginSchema), controller.LOGIN_CONTROLLER);
router.post(
  "/register",
  validateRequestBody(authValidate.registerSchema),
  controller.REGISTER_CONTROLLER,
);
router.patch(
  "/change-password",
  [authMiddleware.verifyToken, validateRequestBody(authValidate.changePasswordSchema)],
  controller.CHANGE_PASSWORD,
);

// router.post("/forgot-password", controller.FORGOT_PASSWORD_CONTROLLER);
// router.post("/reset-password", [middleware.verifyToken], controller.RESET_PASSWORD_CONTROLLER);
export default router;
