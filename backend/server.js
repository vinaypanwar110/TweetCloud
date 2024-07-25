import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectMongoDB from "./db/connectMongoDB.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT||5000;


app.use(express.json()); // working b/w req and respond // to parse req.body
app.use(express.urlencoded({extended:true})); // to parse form data;
app.use(cookieParser());

app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.listen(PORT,()=>{
      console.log(`server is running at ${PORT}`);
      connectMongoDB();
})