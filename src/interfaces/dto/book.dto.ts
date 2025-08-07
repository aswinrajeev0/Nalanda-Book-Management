export interface BookResponseDto {
    id: string;
    title: string;
    ISBN: number;
    author: string;
    publicationDate: Date;
    genre: string;
    stock: number;
}