import { container } from "tsyringe";
import { IUserRepository } from "../interfaces/repositories/userrepository.interface";
import UserRepository from "../repositories/user/user.repository";
import { IBookRepository } from "../interfaces/repositories/bookrepository.interface";
import BookRepository from "../repositories/book/book.repository";

container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository
})

container.register<IBookRepository>("IBookRepository", {
    useClass: BookRepository
})