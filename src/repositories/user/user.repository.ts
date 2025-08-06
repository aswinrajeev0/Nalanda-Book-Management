import BaseRepository from '../baseRepository/base.repository';
import UserModel from '../../models/User.model';
import { IUser } from '../../interfaces/models/usermodel.interface';
import { IUserRepository } from '../../interfaces/repositories/userrepository.interface';
import { injectable } from 'tsyringe';

@injectable()
export default class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string) {
        return this.findOne({ email });
    }
}