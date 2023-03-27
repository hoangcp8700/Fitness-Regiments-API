import express from "express";

// import authMiddleware from "@middleware/auth";
import controller from "@/controllers/UserController";

const router = express.Router();

router.get("/users", controller.GET_USER_LIST_CONTROLLER);
router.get("/users/:id", controller.GET_DETAIL_CONTROLLER);
router.patch("/users/:id", controller.UPDATE_CONTROLLER);
router.delete("/users/:id", controller.DELETE_CONTROLLER);

export default router;
