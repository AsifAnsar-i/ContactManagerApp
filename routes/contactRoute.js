import express from "express";
import {
  createController,
  getAllContactController,
  getOneContactController,
  updateContactController,
  deleteContactController,
} from "../controllers/constctController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/contact", verifyToken, createController);
router.get("/contacts", getAllContactController);
router.get("/contact/:id", getOneContactController);
router.put("/contact/:id", updateContactController);
router.delete("/contact/:id", verifyToken, deleteContactController);

export default router;
