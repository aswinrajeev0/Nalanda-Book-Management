import { inject, injectable } from "tsyringe";
import { IBookService } from "../interfaces/services/bookservice.interface";
import { BookResponseDto } from "../interfaces/dto/book.dto";
import { AddBookDto, UpdateBookDto } from "../utils/shared/validation/book.schema";
import { IBook } from "../interfaces/models/bookmode.interface";
import { IBookRepository } from "../interfaces/repositories/bookrepository.interface";
import { toBookResponseDto } from "../utils/mapper/book.mapper";
import { CustomError } from "../utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../utils/shared/constants";

@injectable()
export default class BookService implements IBookService {
    constructor(
        @inject("IBookRepository") private _bookRepo: IBookRepository
    ) { }

    async addBook(bookData: AddBookDto): Promise<BookResponseDto> {
        const book = await this._bookRepo.create(bookData);
        return toBookResponseDto(book);
    }

    async updateBook(id: string, updateData: Partial<UpdateBookDto>): Promise<BookResponseDto> {
        const book = await this._bookRepo.update(id, updateData);
        if (!book) {
            throw new CustomError(
                ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        return toBookResponseDto(book)
    }

    async listBooks(query: {
        limit: number,
        skip: number,
        genre?: string,
        author?: string
    }): Promise<{books: BookResponseDto[], totalPages: number}> {
        const filter: any = {};
        if (query.genre) {
            filter.genre = { $regex: query.genre, $options: "i" };
        }
        if (query.author) {
            filter.author = { $regex: query.author, $options: "i" };
        }

        const {totalPages, books} = await this._bookRepo.paginatedFilter(query.skip, query.limit, filter)

        const booksArr: BookResponseDto[] = books.map(book => {
            return (
                toBookResponseDto(book)
            )
        });

        return {
            books: booksArr,
            totalPages
        }
        
    }

    async deleteBook(id: string): Promise<BookResponseDto> {
        const book = await this._bookRepo.delete(id);
        if (!book) {
            throw new CustomError(
                ERROR_MESSAGES.RESOURCE_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        return toBookResponseDto(book)
    }
}