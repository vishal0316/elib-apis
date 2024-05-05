import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required.");
    return next(error);
  }
  // database call
  const user = await userModel.findOne({ email });

  if (user) {
    const error = createHttpError(400, "User already exists.");
    return next(error);
  }

  // password #
  const hashPassword = await bcrypt.hash(password, 10);

  // process

  const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  // token generation

  const token = sign(
    {
      sub: newUser._id,
    },
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );

  // Response

  res.json({ accessToken: token });
};

export { createUser };
