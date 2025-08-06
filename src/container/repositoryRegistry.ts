import { container } from "tsyringe";
import { IUserRepository } from "../interfaces/repositories/userrepository.interface";
import UserRepository from "../repositories/user/user.repository";

container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository
})