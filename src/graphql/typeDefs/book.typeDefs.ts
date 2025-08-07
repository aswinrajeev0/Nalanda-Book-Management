import { gql } from 'graphql-tag';

export const bookTypeDefs = gql`
  type Book {
    id: ID!
    title: String!
    ISBN: Int!
    author: String!
    publicationDate: String!
    genre: String!
    stock: Int!
    createdAt: String
    updatedAt: String
  }

  input AddBookInput {
    title: String!
    ISBN: Int!
    author: String!
    publicationDate: String!
    genre: String!
    stock: Int!
  }

  type AddBookResponse {
    success: Boolean!
    message: String!
    book: Book
  }

  type BookResponse {
    success: Boolean!
    message: String!
    book: Book
  }

  type PaginatedBooks {
    books: [Book!]!
    totalPages: Int!
    page: Int!
  }

  input UpdateBookInput {
    title: String
    author: String
    genre: String
    publicationDate: String
    stock: Int
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
  }

  extend type Mutation {
    addBook(bookData: AddBookInput!): Book!
    updateBook(id: ID!, updateData: UpdateBookInput): Book!
    deleteBook(id: ID!): DeleteResponse!
  }

  extend type Query {
    listBooks(page: Int, limit: Int, genre: String, author: String): PaginatedBooks!
  }
`;
