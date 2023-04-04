import express from "express";

import controller from "@/controllers/ExerciseController";
import MULTER from "@configs/multer";
import { checkFileIsImage } from "@middleware/file";
import authMiddleware from "@middleware/auth";
import validateRequestBody from "@middleware/validate";
import exerciseValidate from "@validators/exerciseValidate";

const router = express.Router();

router.get("/exercises", controller.GET_LIST_CONTROLLER);
router.get("/exercises/:id", controller.GET_DETAIL_CONTROLLER);

router.post(
  "/exercises",
  [
    authMiddleware.verifyToken,
    MULTER.array("files"),
    validateRequestBody(exerciseValidate.exerciseSchema),
    authMiddleware.isAdmin(true),
  ],
  controller.CREATE_CONTROLLER,
);

router.patch(
  "/exercises/:id",
  MULTER.array("files"),
  [
    authMiddleware.verifyToken,
    validateRequestBody(exerciseValidate.exerciseUpdateSchema),
    checkFileIsImage(false),
  ],
  controller.UPDATE_CONTROLLER,
);
router.delete("/exercises/:id", [authMiddleware.verifyToken], controller.DELETE_CONTROLLER);

export default router;
