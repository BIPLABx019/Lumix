import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import chatRoutes from "./routes/chat.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

import { connectDB } from "./lib/db.js";


dotenv.config();

const app = express()
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("api/users", userRoutes)
app.use("api/chats", chatRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})