import { AddBookDto, UpdateBookDto } from "../../utils/shared/validation/book.schema";
import { BookResponseDto } from "../dto/book.dto";
import { IBook } from "../models/bookmode.interface";

export interface IBookService {
    addBook(bookData: AddBookDto): Promise<BookResponseDto>;
    updateBook(id: string, updateData: Partial<UpdateBookDto>): Promise<BookResponseDto>;
    listBooks(query: {
        limit: number,
        skip: number,
        genre?: string,
        author?: string
    }): Promise<{books: BookResponseDto[], totalPages: number}>;
    deleteBook(id: string): Promise<BookResponseDto>;
}