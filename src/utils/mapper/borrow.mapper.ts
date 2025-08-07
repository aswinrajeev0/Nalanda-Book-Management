import { BorrowResponseDto } from "../../interfaces/dto/borrow.dto";
import { IBorrow } from "../../interfaces/models/borrowmodel.interface";

export const toBorrowResponseDto = (borrow: IBorrow): BorrowResponseDto => {
    return {
        id: borrow._id as string,
        bookId: borrow.bookId.toString(),
        userId: borrow.userId.toString(),
        borrowedAt: borrow.borrowedAt,
        returnedAt: borrow.returnedAt,
        status: borrow.status
    };
};