import { container } from "tsyringe";
import AuthController from "../controllers/auth.controller";

export const authController = container.resolve(AuthController)