import { container } from "tsyringe";
import { IAuthService } from "../interfaces/services/authservice.interface";
import AuthService from "../services/auth.service";
import { IBookService } from "../interfaces/services/bookservice.interface";
import BookService from "../services/book.service";
import { IBorrowService } from "../interfaces/services/borrowservice.interface";
import BorrowService from "../services/borrow.service";

container.register<IAuthService>("IAuthService", {
    useClass: AuthService
})

container.register<IBookService>("IBookService", {
    useClass: BookService
})

container.register<IBorrowService>("IBorrowService", {
    useClass: BorrowService
})