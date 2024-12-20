import express from "express";
import authRouter from "../routes/auth.route.js";
import dotenv from "dotenv"
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser"
import messageRouter from "../routes/message.route.js";
import cors from "cors";
import { app, server } from "../lib/socket.js";

import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

// routes
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// server
server.listen(PORT, ()=> {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDB();
});
