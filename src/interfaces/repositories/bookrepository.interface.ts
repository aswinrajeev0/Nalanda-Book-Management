import { IBook } from "../models/bookmode.interface";
import { IBaseRepository } from "./baserepository.interface";

export interface IBookRepository extends IBaseRepository<IBook> {
    paginatedFilter(skip: number, limit: number, filter: any): Promise<{books: IBook[], totalPages: number}>
}