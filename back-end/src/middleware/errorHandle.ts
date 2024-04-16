import { NextFunction, Request, Response } from "express";
import { ErrorProps } from "../types/types";

export const nextErrors = (
  error: ErrorProps,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message ?? "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
