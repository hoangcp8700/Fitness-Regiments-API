import express from "express";

import controller from "@/controllers/AdsController";
import MULTER from "@configs/multer";
import { checkFileIsImage } from "@middleware/file";
import authMiddleware from "@middleware/auth";
import validateRequestBody from "@middleware/validate";
import adsValidate from "@validators/adsValidate";

const router = express.Router();

router.get("/ads", [authMiddleware.verifyToken], controller.GET_LIST_CONTROLLER);
router.get(
  "/ads/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin(true)],
  controller.GET_DETAIL_CONTROLLER,
);

router.post(
  "/ads",
  MULTER.single("file"),
  [
    authMiddleware.verifyToken,
    validateRequestBody(adsValidate.adsSchema),
    authMiddleware.isAdmin(true),
    checkFileIsImage(false),
  ],
  controller.CREATE_CONTROLLER,
);

router.patch(
  "/ads/:id",
  MULTER.single("file"),
  [
    authMiddleware.verifyToken,
    validateRequestBody(adsValidate.adsUpdateSchema),
    authMiddleware.isAdmin(true),
    checkFileIsImage(false),
  ],
  controller.UPDATE_CONTROLLER,
);
router.delete(
  "/ads/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin(true)],
  controller.DELETE_CONTROLLER,
);

export default router;
