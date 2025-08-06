import { container } from "tsyringe";
import { IAuthService } from "../interfaces/services/authservice.interface";
import AuthService from "../services/auth.service";

container.register<IAuthService>("IAuthService", {
    useClass: AuthService
})