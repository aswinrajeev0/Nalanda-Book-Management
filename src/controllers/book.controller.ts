import { Request, Response, NextFunction } from "express";
import { IBookController } from "../interfaces/controllers/book.controller.interface";
import { inject, injectable } from "tsyringe";
import { IBookService } from "../interfaces/services/bookservice.interface";
import { AddBookSchema, UpdateBookSchema } from "../utils/shared/validation/book.schema";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../utils/shared/constants";

@injectable()
export default class Bookcontroller implements IBookController {
    constructor(
        @inject("IBookService") private _bookService: IBookService
    ) { }

    async addBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bookData = AddBookSchema.parse(req.body);
            const book = await this._bookService.addBook(bookData);

            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_CREATED,
                book
            })
        } catch (error) {
            next(error)
        }
    }

    async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.BAD_REQUEST
                })
                return;
            }

            const updateData = UpdateBookSchema.parse(req.body);

            const book = await this._bookService.updateBook(id, updateData)

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_UPDATED,
                book
            })
        } catch (error) {
            next(error)
        }
    }

    async listBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const genre = typeof req.query.genre === "string" ? req.query.genre : undefined;
            const author = typeof req.query.author === "string" ? req.query.author : undefined;

            const { books, totalPages } = await this._bookService.listBooks({ limit, skip, genre, author });

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_FETCHED,
                books,
                totalPages,
                page
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;
            if (!id) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false,
                    message: ERROR_MESSAGES.BAD_REQUEST
                })
                return;
            }

            const stringId = id.toString()

            await this._bookService.deleteBook(stringId)

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.RESOURCE_DELETED
            })

        } catch (error) {
            next(error)
        }
    }
}