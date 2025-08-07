import mongoose, { Schema } from "mongoose";
import { IBook } from "../interfaces/models/bookmodel.interface";

const BookSchema: Schema = new Schema<IBook>({
    title: {type: String, required: true},
    ISBN: {type: Number, required: true, unique: true},
    author: {type: String, required: true},
    stock: {type: Number, required: true, default: 0},
    genre: {type: String, required: true},
    publicationDate: {type: Date, required: true},
}, {
    timestamps: true
})

const BookModel = mongoose.model<IBook>("Book", BookSchema)

export default BookModel;