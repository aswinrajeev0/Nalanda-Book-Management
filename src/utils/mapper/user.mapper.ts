
import { IUser } from "../../interfaces/models/usermodel.interface";
import { UserResponseDto } from "../../interfaces/dto/user.dto";
import { ObjectId } from "mongoose";

export const toUserResponseDto = (user: IUser): UserResponseDto => {
    return {
        id: (user._id as ObjectId).toString(),
        name: user.name,
        email: user.email,
    };
};
