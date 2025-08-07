import { IBook } from "../../interfaces/models/bookmodel.interface";
import { IBorrow } from "../../interfaces/models/borrowmodel.interface";
import { IUser } from "../../interfaces/models/usermodel.interface";
import { IBorrowRepository } from "../../interfaces/repositories/borrowrepository.interface";
import BorrowModel from "../../models/Borrow.model";
import BaseRepository from "../baseRepository/base.repository";

export class BorrowRepository extends BaseRepository<IBorrow> implements IBorrowRepository {
    constructor() {
        super(BorrowModel)
    }

    async mostBorrowedBooks(): Promise<IBook[]> {
        const data = await BorrowModel.aggregate([
            { $group: { _id: "$bookId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$book" },
            { $replaceRoot: { newRoot: "$book" } }
        ])

        return data as IBook[]

    }

    async activeUsers(): Promise<IUser[]> {
        const data = await BorrowModel.aggregate([
            { $group: { _id: "$userId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            { $replaceRoot: { newRoot: "$user" } }
        ])

        return data as IUser[]
    }
}