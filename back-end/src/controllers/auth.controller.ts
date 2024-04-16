import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user.module.js";
import j from "joi";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const signupSheme = j.object({
  username: j.string().min(2).required(),
  email: j.string().email().required(),
  password: j.string().min(4).max(12).required(),
});

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { value, error } = signupSheme.validate(req.body);
    if (error) {
      console.error("Error during signup:", error);
      next(errorHandler(400, error.details));
    }
    const hasPassword = bcrypt.hashSync(value.password, 10);
    const newUser = new User({
      ...value,
      password: hasPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(errorHandler(500, "Internal server error"));
  }
};
