import express from  "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import gigRoute from "./routes/gigRoute.js"
import orderRoute from "./routes/orderRoute.js"
import reviewRoute from "./routes/reviewRoute.js"
import messageRoute from "./routes/messageRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import conversationRoute from "./routes/conversationRoute.js"

const app = express()
dotenv.config()

//COnnecting to Mongoose DB

const connect = async ()=>{
   try {
    await  mongoose.connect(process.env.MONGODB_URI)
    console.log("DB connected")
   } catch (error) {
    console.error("MongoDB Connection Error:", error);
    
   }
}

//middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));




app.use("/api/auth",authRoute)
app.use("/api/user", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/review", reviewRoute)
app.use("/api/orders",  orderRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/messages", messageRoute)

//Error Handling
app.use((error,req,res,next)=> {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage)
})


app.listen(8000,()=>{
    connect()
    console.log("Server is Running on Port 8000")
})