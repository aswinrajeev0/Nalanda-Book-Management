import { IUser } from "../models/usermodel.interface";

export interface IUserRepository {
    create(user: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
}