import { container } from "tsyringe";
import AuthController from "../controllers/auth.controller";
import Bookcontroller from "../controllers/book.controller";
import BorrowController from "../controllers/borrow.controller";

export const authController = container.resolve(AuthController);
export const bookController = container.resolve(Bookcontroller);
export const borrowController = container.resolve(BorrowController);