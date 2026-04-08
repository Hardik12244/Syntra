import { Request, Response ,NextFunction} from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: Request, res: Response,next:NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ msg: "No token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = jwt.verify(token, "secret123");

        (req as any).user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
}