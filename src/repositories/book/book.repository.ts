import { IBook } from "../../interfaces/models/bookmode.interface";
import { IBookRepository } from "../../interfaces/repositories/bookrepository.interface";
import BookModel from "../../models/Book.model";
import BaseRepository from "../baseRepository/base.repository";

export default class BookRepository extends BaseRepository<IBook> implements IBookRepository {
    constructor(){
        super(BookModel)
    }

    async paginatedFilter(skip: number, limit: number, filter: any): Promise<{books: IBook[], totalPages: number}> {
        const totalPages = await this.countDocuments(filter);
        const books = await BookModel.find(filter).skip(skip).limit(limit)

        return {
            books,
            totalPages
        }
    }
}