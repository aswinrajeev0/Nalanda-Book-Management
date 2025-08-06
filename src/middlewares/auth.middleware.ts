import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../utils/shared/constants";
import { decodeToken } from "../utils/jwt";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new CustomError(
            ERROR_MESSAGES.UNAUTHORIZED,
            HTTP_STATUS.UNAUTHORIZED
        ))
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = decodeToken(token) as JwtPayload;
        req.user = decoded;
        next()
    } catch (error) {
        next(new CustomError(
            ERROR_MESSAGES.UNAUTHORIZED,
            HTTP_STATUS.UNAUTHORIZED
        ))
    }
}

export const authorizeRole = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new CustomError(
                ERROR_MESSAGES.UNAUTHORIZED,
                HTTP_STATUS.FORBIDDEN
            ));
        }
        next();
    };
};
