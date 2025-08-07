import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/models/borrowmodel.interface";

const BorrowSchema: Schema = new Schema<IBorrow>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    borrowedAt: { type: Date, required: true },
    returnedAt: { type: Date },
    status: {
        type: String,
        enum: ["borrowed", "returned"],
        default: "borrowed"
    }
}, {
    timestamps: true
})

const BorrowModel = model<IBorrow>("Borrow", BorrowSchema);
export default BorrowModel;