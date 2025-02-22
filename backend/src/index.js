import express from "express"
import dotenv from "dotenv"
import authRoutes from"./routes/auth.route.js"
import {connectDB} from "./lib/db.js"
//dotenv.config(); pour acceder a les parametre dans fichier .env
dotenv.config();
const app =express();


const PORT =process.env.PORT;
//adding middelware
app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log("server is runing on port :"+ PORT)
    connectDB()
});