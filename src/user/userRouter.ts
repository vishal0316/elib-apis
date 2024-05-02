import express from "express";
import { createUser } from "./userControllers";

const userRouter = express.Router();

// routes
userRouter.post("/register", createUser);

// (req, res) => {
//   res.json({ message: "register", createUser });
// });

export default userRouter;
