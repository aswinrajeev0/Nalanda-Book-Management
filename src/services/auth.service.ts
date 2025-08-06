import { inject, injectable } from "tsyringe";
import { IUser } from "../interfaces/models/usermodel.interface";
import { IAuthService } from "../interfaces/services/authservice.interface";
import { LoginDto, RegisterDto } from "../utils/shared/validation/auth.schema";
import { IUserRepository } from "../interfaces/repositories/userrepository.interface";
import { CustomError } from "../utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../utils/shared/constants";
import { comparePassword, hashPassword } from "../utils/shared/password";
import { toUserResponseDto } from "../utils/mapper/user.mapper";
import { LoginResponseDto, UserResponseDto } from "../interfaces/dto/user.dto";
import { generateToken } from "../utils/jwt";

@injectable()
export default class AuthService implements IAuthService {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { }
    async register(userData: RegisterDto): Promise<UserResponseDto> {
        const existingUser = await this._userRepo.findByEmail(userData.email);
        if (existingUser) {
            throw new CustomError(ERROR_MESSAGES.USER_ALREADY_EXISTS, HTTP_STATUS.CONFLICT)
        }

        const hashedPassword = await hashPassword(userData.password);

        const user = await this._userRepo.create({ ...userData, password: hashedPassword } as IUser)
        return toUserResponseDto(user)
    }

    async login(loginData: LoginDto): Promise<LoginResponseDto> {
        const user = await this._userRepo.findByEmail(loginData.email);
        if(!user) {
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const isMatch = await comparePassword(loginData.password, user.password);
        if(!isMatch){
            throw new CustomError(
                ERROR_MESSAGES.INVALID_CREDENTIALS,
                HTTP_STATUS.UNAUTHORIZED
            )
        }

        const token = generateToken({id: user._id, role: user.role});

        const userResponse = toUserResponseDto(user);
        return {
            user: userResponse,
            token
        }
    }
}