import { inject, injectable } from "tsyringe";
import { BorrowResponseDto } from "../interfaces/dto/borrow.dto";
import { IBorrowService } from "../interfaces/services/borrowservice.interface";
import { IBorrowRepository } from "../interfaces/repositories/borrowrepository.interface";
import { IBookRepository } from "../interfaces/repositories/bookrepository.interface";
import { CustomError } from "../utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../utils/shared/constants";
import { Types } from "mongoose";
import { toBorrowResponseDto } from "../utils/mapper/borrow.mapper";
import { BookResponseDto } from "../interfaces/dto/book.dto";
import { UserResponseDto } from "../interfaces/dto/user.dto";
import { toBookResponseDto } from "../utils/mapper/book.mapper";
import { toUserResponseDto } from "../utils/mapper/user.mapper";

@injectable()
export default class BorrowService implements IBorrowService {
    constructor(
        @inject("IBorrowRepository") private _borrowRepo: IBorrowRepository,
        @inject("IBookRepository") private _bookRepo: IBookRepository
    ) { }

    async borrowBook(bookId: string, userId: string): Promise<BorrowResponseDto> {
        const book = await this._bookRepo.findById(bookId);
        if (!book) {
            throw new CustomError(
                ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        if (book.stock < 1) {
            throw new CustomError(
                ERROR_MESSAGES.NOT_ENOUGH_STOCK,
                HTTP_STATUS.CONFLICT
            )
        }

        const exists = await this._borrowRepo.findOne({userId, bookId});
        if(exists){
            throw new CustomError(
                ERROR_MESSAGES.RESOURCE_ALREADY_EXISTS,
                HTTP_STATUS.CONFLICT
            )
        }

        const borrow = await this._borrowRepo.create({
            userId: new Types.ObjectId(userId),
            bookId: new Types.ObjectId(bookId),
            borrowedAt: new Date(),
        })

        await this._bookRepo.update(bookId, { $inc: { stock: -1 } })

        return toBorrowResponseDto(borrow);
    }

    async returnBook(id: string): Promise<BorrowResponseDto> {
        const borrow = await this._borrowRepo.update(id, { $set: { status: "returned", returnedAt: new Date() } });
        if (!borrow) {
            throw new CustomError(
                ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const book = await this._bookRepo.update(borrow.bookId.toString(), { $inc: { stock: 1 } });
        if (!book) {
            throw new CustomError(
                ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        return toBorrowResponseDto(borrow);
    }

    async borrowHistory(userId: string): Promise<BorrowResponseDto[]> {
        const borrows = await this._borrowRepo.findAll({userId});
        return borrows.map(borrow => toBorrowResponseDto(borrow));
    }

    async mostBorrowedBooks(): Promise<BookResponseDto[]> {
        const data = await this._borrowRepo.mostBorrowedBooks();
        return data.map(book => toBookResponseDto(book))
    }

    async activeUsers(): Promise<UserResponseDto[]> {
        const data = await this._borrowRepo.activeUsers();
        return data.map(user => toUserResponseDto(user));
    }
}