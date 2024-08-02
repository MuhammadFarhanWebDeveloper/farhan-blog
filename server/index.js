import express from "express";
import auth from "./routes/auth.js";
import cors from "cors";
import post from "./routes/post.js";
import { config } from "dotenv";
import connectToMongoDB from "./db.js";
import comment from "./routes/comments.js";

import cookieParser from "cookie-parser";
const app = express();
const port = 3000;
// MIDDLEWARES
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
// The first middleware is used to access req.body
app.use(cookieParser());
app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api/comment", comment);
// .env configuration
config({
  path: "./config.env",
});

// Connect with mongodb
connectToMongoDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
