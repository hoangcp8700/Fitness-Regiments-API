import express from "express";

import controller from "@/controllers/WorkoutRegimentController";
import authMiddleware from "@middleware/auth";
import validateRequestBody from "@middleware/validate";
import workoutRegimentValidate from "@validators/workoutRegimentValidate";

const router = express.Router();

router.get("/workout-regiments", controller.GET_LIST_CONTROLLER);
router.get("/workout-regiments/:id", controller.GET_DETAIL_CONTROLLER);

router.post(
  "/workout-regiments",
  [authMiddleware.verifyToken, validateRequestBody(workoutRegimentValidate.workoutSchema)],
  controller.CREATE_CONTROLLER,
);

router.patch(
  "/workout-regiments/:id",
  [authMiddleware.verifyToken, validateRequestBody(workoutRegimentValidate.workoutSchema)],
  controller.UPDATE_CONTROLLER,
);
router.delete("/workout-regiments/:id", [authMiddleware.verifyToken], controller.DELETE_CONTROLLER);

export default router;
