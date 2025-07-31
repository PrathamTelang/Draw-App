import { config } from './config';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.userId) {
        //@ts-ignore
        req.userId = decoded.userId;
        next()
    } else {
        res.status(403).json({
            message: "Unauthorised"
        })
    }
}