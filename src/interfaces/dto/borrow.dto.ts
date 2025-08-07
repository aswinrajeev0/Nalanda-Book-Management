export interface BorrowResponseDto {
    id: string;
    userId: string;
    bookId: string;
    borrowedAt: Date;
    returnedAt: Date;
    status: "borrowed" | "returned";
}