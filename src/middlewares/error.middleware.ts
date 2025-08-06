import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../utils/shared/constants";
import { ZodError } from "zod";
import { CustomError } from "../utils/custom.error";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message: string = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
    let errors: any[] | null = null;

    if (err instanceof ZodError) {
        statusCode = HTTP_STATUS.BAD_REQUEST;
        message = ERROR_MESSAGES.VALIDATION_FAILED;
        errors = err.issues.map(error => ({
            field: error.path.join("."),
            message: error.message
        }));
    } else if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        console.error("Unhandled Error:", err);
        if (err.name === "TokenExpiredError") {
            statusCode = HTTP_STATUS.UNAUTHORIZED
            message = ERROR_MESSAGES.TOKEN_EXPIRED
        }
    }
    // logger.error(`[${req.method}] ${req.url} - ${err.message}`, { stack: err.stack });
    console.error(err)
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors,
    });
};
