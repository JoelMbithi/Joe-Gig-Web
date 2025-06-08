import { verifyToken } from "../middleware/jwt.js";
import { createMessage, getMessages } from "../controllers/messageController.js";
import express from "express";

const router = express.Router();

router.post("/", verifyToken, createMessage); // ✅ Fixed endpoint
router.get("/:id", verifyToken, getMessages);

export default router;
