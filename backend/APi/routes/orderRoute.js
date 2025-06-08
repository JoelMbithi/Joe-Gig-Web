import { verifyToken } from "../middleware/jwt.js";
import express from "express";
import { getOrder,intent, confirmPayment} from "../controllers/orderController.js"


const router = express.Router()


router.get("/", verifyToken, getOrder);

//for payment intergraation
router.post("/create-payment-intent/:id",verifyToken, intent)
router.post("/confirm-payment", verifyToken, confirmPayment);



export default router