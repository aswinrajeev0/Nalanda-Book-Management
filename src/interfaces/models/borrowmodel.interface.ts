import { Document, Types } from "mongoose";

export interface IBorrow extends Document {
    userId: Types.ObjectId;
    bookId: Types.ObjectId;
    borrowedAt: Date;
    returnedAt: Date;
    status: "borrowed" | "returned";
    createdAt?: Date;
    updatedAt?: Date;
}