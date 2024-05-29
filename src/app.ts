import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
// import { config } from "./config/config";

const app = express();

// Update the cors middleware to include https://elib-dashboard.onrender.com in the allowed origins
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://elib-frontend.vercel.app",
      "https://elib-dashboard.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
// Http methods: GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
 
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
