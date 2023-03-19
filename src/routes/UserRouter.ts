import express from "express";

import authMiddleware from "@/middleware/authMiddleware";

import controller from "@/controllers/UserController";

const router = express.Router();

router.get("/users/:id", [authMiddleware.checkUserExistByID], controller.GET_DETAIL_CONTROLLER);
router.delete(
  "/users/:id",
  [authMiddleware.verifyToken, authMiddleware.roleAccess],
  controller.DELETE_CONTROLLER,
);

export default router;
