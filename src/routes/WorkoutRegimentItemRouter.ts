import express from "express";

import controller from "@/controllers/WorkoutRegimentItemController";
import authMiddleware from "@middleware/auth";
import validateRequestBody, { validateRequestArrayBody } from "@middleware/validate";
import workoutRegimentValidate from "@validators/workoutRegimentValidate";

const router = express.Router();

router.get("/workout-regiments/:id/items", controller.GET_LIST_CONTROLLER);
router.get("/workout-regiments/:id/items/:itemID", controller.GET_DETAIL_CONTROLLER);

// TODO
router.post(
  "/workout-regiments/:id",
  [authMiddleware.verifyToken, validateRequestBody(workoutRegimentValidate.workoutItemSchema)],
  controller.CREATE_CONTROLLER,
);

router.patch(
  "/workout-regiments/:id/items/:itemID",
  [authMiddleware.verifyToken, validateRequestBody(workoutRegimentValidate.workoutItemSchema)],
  controller.UPDATE_CONTROLLER,
);
router.delete(
  "/workout-regiments/:id/items",
  [authMiddleware.verifyToken, validateRequestArrayBody(workoutRegimentValidate.deleteSchema)],
  controller.DELETE_CONTROLLER,
);

export default router;
