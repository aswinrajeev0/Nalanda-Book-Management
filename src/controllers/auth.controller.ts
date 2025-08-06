import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interfaces/controllers/auth.controller.interface";
import { LoginSchema, RegisterSchema } from "../utils/shared/validation/auth.schema";
import { inject, injectable } from "tsyringe";
import { IAuthService } from "../interfaces/services/authservice.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../utils/shared/constants";

@injectable()
export default class AuthController implements IAuthController {
    constructor(
        @inject("IAuthService") private _authService: IAuthService
    ) { }
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = RegisterSchema.parse(req.body)
            const user = await this._authService.register(userData);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                message: SUCCESS_MESSAGES.USER_REGISTERED,
                user
            })
        } catch (error) {
            next(error)
        }
    };

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const loginData = LoginSchema.parse(req.body);
            const {user, token} = await this._authService.login(loginData);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: SUCCESS_MESSAGES.USER_LOGGED_IN,
                user,
                token
            })
        } catch (error) {
            next(error)
        }
    };
}