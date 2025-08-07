import { container } from "tsyringe";
import { IUserRepository } from "../interfaces/repositories/userrepository.interface";
import UserRepository from "../repositories/user/user.repository";
import { IBookRepository } from "../interfaces/repositories/bookrepository.interface";
import BookRepository from "../repositories/book/book.repository";
import { IBorrowRepository } from "../interfaces/repositories/borrowrepository.interface";
import { BorrowRepository } from "../repositories/borrow/borrow.repository";

container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository
})

container.register<IBookRepository>("IBookRepository", {
    useClass: BookRepository
})

container.register<IBorrowRepository>("IBorrowRepository", {
    useClass: BorrowRepository
})