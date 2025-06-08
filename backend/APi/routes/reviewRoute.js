import { verifyToken } from "../middleware/jwt.js"
import express from "express"
import {createReview, getReview}  from "../controllers/reviewController.js"


const router = express.Router()

router.post("/createReview", verifyToken, createReview)
router.get("/getReview/:gigId", getReview)
//router.delete("/deleteReview/:id",deleteReview)

export default router;