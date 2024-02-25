import express from "express";
import {
  deleteConnector,
  loginController,
  registerController,
  userController
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/users", userController);
router.delete("/current/:id", verifyToken, deleteConnector);

export default router;
