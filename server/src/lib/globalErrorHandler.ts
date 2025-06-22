import { Response, Request, NextFunction } from "express";
export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Global error handler: ", err);
  res.status(400).json({
    success: false,
    message: err.message || " Server Error",
  });
};
