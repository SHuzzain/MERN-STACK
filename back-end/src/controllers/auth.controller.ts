import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user.module.js";
import J from "joi";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const loginSchema = J.object({
  username: J.string()
    .min(4)
    .max(10)
    .alter({
      POST: (schema) => schema.required(),
      PUT: (schema) => schema.forbidden(),
    }),
  email: J.string().email().min(4).required(),
  password: J.string().min(5).max(20).required(),
});

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { value, error } = loginSchema.tailor("POST").validate(req.body);
    if (error) {
      console.error("Error during signup:", error);
      next(errorHandler(400, error.details));
    }
    const validUser = await User.findOne({ email: value.email });

    if (validUser?.email) {
      next(errorHandler(404, "User already exit"));
    }

    const hasPassword = bcrypt.hashSync(value.password, 10);
    const newUser = new User({
      ...value,
      password: hasPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("SIGN_UP:", error);
    next(errorHandler(500, "Internal server error"));
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { value, error } = loginSchema.tailor("PUT").validate(req.body);
    if (error) {
      return next(errorHandler(400, error.details));
    }

    const validUser = await User.findOne({ email: value.email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = await bcrypt.compare(
      value.password,
      validUser.password as string
    );
    if (!isPasswordValid) {
      return next(errorHandler(401, "Incorrect password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET!);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ message: "Signin successful", token });
  } catch (error) {
    console.log("SIGN_IN:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
