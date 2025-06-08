import { verifyToken } from "../middleware/jwt.js"
import express from 'express'
import {getConversations,createConversations,getSingleConversations,updateConversations} from "../controllers/conversationController.js"

const router = express.Router()

router.get("/",verifyToken, getConversations)
router.post("/",verifyToken, createConversations)
router.get("/singleConversation/:id",verifyToken, getSingleConversations)
router.put("/:id",verifyToken, updateConversations)

export default router