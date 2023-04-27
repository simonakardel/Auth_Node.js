import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();


import cookieParser from "cookie-parser";
app.use(cookieParser());

app.use(express.json());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

//ROUTERS
import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import contactRouter from "./routers/contactRouter.js";
app.use(contactRouter);

import articlesRouter from "./routers/articles.js";
app.use(articlesRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));