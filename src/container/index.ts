import { container } from "tsyringe";
import AuthController from "../controllers/auth.controller";
import Bookcontroller from "../controllers/book.controller";

export const authController = container.resolve(AuthController);
export const bookController = container.resolve(Bookcontroller);