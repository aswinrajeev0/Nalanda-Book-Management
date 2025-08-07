import { Request, Response, NextFunction } from "express";
import { IBorrowController } from "../interfaces/controllers/borrow.controller.interface";
import { inject, injectable } from "tsyringe";
import { IBorrowService } from "../interfaces/services/borrowservice.interface";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../utils/shared/constants";

@injectable()
export default class BorrowController implements IBorrowController {
    constructor(
        @inject("IBorrowService") private _borrowService: IBorrowService
    ) { }

    async borrow(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { bookId } = req.params;
            const userId = req.user?.id
            if (!bookId || !userId) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.BAD_REQUEST
                })
                return;
            }

            const book = await this._borrowService.borrowBook(bookId, userId)

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_CREATED,
                book
            })
        } catch (error) {
            next(error)
        }
    }

    async return(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const userId = req.user?.id
            if (!id || !userId) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.BAD_REQUEST
                })
                return;
            }
            const book = await this._borrowService.returnBook(id);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_UPDATED,
                book
            })
        } catch (error) {
            next(error)
        }
    }

    async borrowHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            if(!userId){
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.UNAUTHORIZED
                })
            }
            const borrows = await this._borrowService.borrowHistory(userId as string)

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_FETCHED,
                borrows
            })
        } catch (error) {
            next(error)
        }
    }

    async mostBorrowedBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._borrowService.mostBorrowedBooks();
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_FETCHED,
                data
            })
        } catch (error) {
            next(error)
        }
    }

    async mostActiveMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await this._borrowService.activeUsers();
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_FETCHED,
                data
            })
        } catch (error) {
            next(error)
        }
    }
}