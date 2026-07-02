import dotenv from "dotenv";

dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ msg: "No token" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!
);

    (req as any).user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}