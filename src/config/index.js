import express from "express";
import connectDB from "./db.js";
import router from "../routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://ydenekjan-shoppinglist.netlify.app",
      "https://shopping-list-six-jade.vercel.app/",
    ],
    credentials: true,
  }),
);

app.use(router);

// Connect to the database
connectDB();

export default app;
