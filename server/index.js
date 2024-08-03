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
const allowedOrigins = [
  "http://localhost:5173",
  "https://farhan-blog.vercel.app",
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
// The first middleware is used to access req.body
app.get("/", (req, res) => {
  res.send("Server is working...");
});
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
