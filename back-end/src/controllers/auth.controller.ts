import { Request, Response } from "express";
import { z, ZodError } from "zod";

const authScheme = z.object({
  username: z.string().min(4, {
    message: "username is mandatory and it should me 4 char*",
  }),
  password: z.string().min(4, {
    message: "password is mandatory and it should me 4 char*",
  }),
  email: z
    .string({
      invalid_type_error: "email is mandatory",
    })
    .email({
      message: "invalid email type",
    }),
});

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = authScheme.parse(req.body);

    console.log("Validated Data:", validatedData);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((err) => err.message);
      res.status(400).json({ errors: errorMessages });
    } else {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
