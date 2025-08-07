import { Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    ISBN: number;
    author: string;
    publicationDate: Date;
    genre: string;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}