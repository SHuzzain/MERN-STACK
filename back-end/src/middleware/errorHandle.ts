import { ErrorRequestHandler } from "express";

export const nextErrors: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    statusMessage,
  });
};
