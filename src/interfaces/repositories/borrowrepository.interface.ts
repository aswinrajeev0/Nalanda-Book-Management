import { IBook } from "../models/bookmodel.interface";
import { IBorrow } from "../models/borrowmodel.interface";
import { IUser } from "../models/usermodel.interface";
import { IBaseRepository } from "./baserepository.interface";

export interface IBorrowRepository extends IBaseRepository <IBorrow> {
    mostBorrowedBooks(): Promise<IBook[]>;
    activeUsers(): Promise<IUser[]>;
}