import { NextFunction, Request, Response } from "express";

export interface IBorrowController {
    borrow(req: Request, res: Response, next: NextFunction): Promise<void>;
    return(req: Request, res: Response, next: NextFunction): Promise<void>;
    borrowHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
    mostBorrowedBooks(req: Request, res: Response, next: NextFunction): Promise<void>;
    mostActiveMembers(req: Request, res: Response, next: NextFunction): Promise<void>;
}