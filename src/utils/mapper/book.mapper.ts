import { ObjectId } from "mongoose";
import { BookResponseDto } from "../../interfaces/dto/book.dto";
import { IBook } from "../../interfaces/models/bookmodel.interface";

export const toBookResponseDto = (book: IBook): BookResponseDto => {
    return {
        id: (book._id as ObjectId).toString(),
        title: book.title,
        author: book.author,
        ISBN: book.ISBN,
        genre: book.genre,
        publicationDate: book.publicationDate,
        stock: book.stock
    };
};