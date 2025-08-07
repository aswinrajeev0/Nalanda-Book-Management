import { container } from "tsyringe";
import { IAuthService } from "../interfaces/services/authservice.interface";
import AuthService from "../services/auth.service";
import { IBookService } from "../interfaces/services/bookservice.interface";
import BookService from "../services/book.service";

container.register<IAuthService>("IAuthService", {
    useClass: AuthService
})

container.register<IBookService>("IBookService", {
    useClass: BookService
})