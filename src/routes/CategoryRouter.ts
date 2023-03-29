import express from "express";

import controller from "@/controllers/CategoryController";
import MULTER from "@configs/multer";
import { checkFileIsImage } from "@middleware/file";
import authMiddleware from "@middleware/auth";
import validateRequestBody from "@middleware/validate";
import categoryValidate from "@validators/categoryValidate";

const router = express.Router();

router.get("/categories", controller.GET_LIST_CONTROLLER);
router.get("/categories/:id", controller.GET_DETAIL_CONTROLLER);

router.post(
  "/categories",
  [
    authMiddleware.verifyToken,
    validateRequestBody(categoryValidate.categorySchema),
    authMiddleware.isAdmin(true),
  ],
  controller.CREATE_CONTROLLER,
);

router.patch(
  "/categories/:id",
  MULTER.single("file"),
  [
    authMiddleware.verifyToken,
    validateRequestBody(categoryValidate.categorySchema),
    checkFileIsImage(false),
  ],
  controller.UPDATE_CONTROLLER,
);
router.delete("/categories/:id", [authMiddleware.verifyToken], controller.DELETE_CONTROLLER);

export default router;
