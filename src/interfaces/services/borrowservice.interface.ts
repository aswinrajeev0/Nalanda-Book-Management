import { BookResponseDto } from "../dto/book.dto";
import { BorrowResponseDto } from "../dto/borrow.dto";
import { UserResponseDto } from "../dto/user.dto";

export interface IBorrowService {
    borrowBook(bookId: string, userId: string): Promise<BorrowResponseDto>;
    returnBook(id: string): Promise<BorrowResponseDto>;
    borrowHistory(userId: string): Promise<BorrowResponseDto[]>
    mostBorrowedBooks(): Promise<BookResponseDto[]>;
    activeUsers(): Promise<UserResponseDto[]>
}