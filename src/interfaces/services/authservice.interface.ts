import { LoginDto, RegisterDto } from "../../utils/shared/validation/auth.schema";
import { LoginResponseDto, UserResponseDto } from "../dto/user.dto";

export interface IAuthService {
    register(userData: RegisterDto): Promise<UserResponseDto>;
    login(loginData: LoginDto): Promise<LoginResponseDto>;
}