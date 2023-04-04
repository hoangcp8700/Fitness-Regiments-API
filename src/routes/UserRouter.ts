import express from "express";

import controller from "@/controllers/UserController";
import MULTER from "@configs/multer";
import { checkFileIsImage } from "@middleware/file";
import authMiddleware from "@middleware/auth";

const router = express.Router();

router.get(
  "/users",
  [authMiddleware.verifyToken, authMiddleware.isAdmin(false)],
  controller.GET_LIST_CONTROLLER,
);
router.get("/users/:id", controller.GET_DETAIL_CONTROLLER);
router.patch(
  "/users/:id/upload-avatar",
  MULTER.single("file"),
  [authMiddleware.verifyToken, checkFileIsImage],
  controller.UPLOAD_AVATAR_CONTROLLER,
);
router.patch("/users/:id", [authMiddleware.verifyToken], controller.UPDATE_CONTROLLER);
router.delete(
  "/users/:id",
  [authMiddleware.verifyToken, authMiddleware.isSuperAdmin],
  controller.DELETE_CONTROLLER,
);

export default router;
