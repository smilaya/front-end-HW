import type { Request, Response, NextFunction } from "express";

export const userMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (auth) {
    const [, userId] = auth.split(" ");
    req.userId = userId;
  }
  next();
};
