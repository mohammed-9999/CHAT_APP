import express from "express"
import dotenv from "dotenv"
import authRoutes from"./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
//dotenv.config(); pour acceder a les parametre dans fichier .env
dotenv.config();
const app =express();


const PORT =process.env.PORT;
//adding middelware to accept send json file in body
app.use(express.json());
//adding this code whene creat a auth.middleware.js file for protectRouter 
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

app.listen(PORT,()=>{
    console.log("server is runing on port :"+ PORT)
    connectDB()
});