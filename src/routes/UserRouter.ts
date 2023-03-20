import express from "express";

// import authMiddleware from "@middleware/auth";
import controller from "@/controllers/UserController";

const router = express.Router();

router.get("/", controller.GET_LIST_USER_CONTROLLER);
// router.get("/users/:id", controller.GET_DETAIL_CONTROLLER);
// router.delete(
//   "/:id",
//   [authMiddleware.verifyToken, authMiddleware.roleAccess],
//   controller.DELETE_CONTROLLER,
// );

export default router;
