import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token; // ✅ read from cookie

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const decoded: any = jwt.verify(token, "secret123");

    (req as any).user = decoded; // you can later attach full user if needed
    next();

  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}