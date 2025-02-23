import express from "express"
import dotenv from "dotenv"
import authRoutes from"./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"

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


// This code is added when an issue is found while fetching data using Axios.  
//the error is:Access to XMLHttpRequest at 'http://localhost:5001/api/auth/check' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
// It allows the frontend to send requests to the backend.
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


app.listen(PORT,()=>{
    console.log("server is runing on port :"+ PORT)
    connectDB()
});