import express from "express";
import { deleteUser, getUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/getUser/:id",getUser)

export default router;
