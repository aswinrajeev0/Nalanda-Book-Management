import gql from "graphql-tag";

export const borrowTypeDefs = gql`

    enum Status {
        returned
        borrowed
    }

    type Borrow {
        id: ID!
        userId: String!
        bookId: String!
        borrowedAt: String!
        returnedAt: String
        status: Status!
        createdAt: String;
        updatedAt: String;
    }

    type BorrowResponse {
        id: ID!
        userId: String!
        bookId: String!
        borrowedAt: String!
        returnedAt: String!
        status: Status!
    }

    type BorrowedBook {
        id: ID!,
        title: String!
        author: String!
        ISBN: Number!
        stock: Number!
        genre: String!
        publicationDate: String!
    }

    enum Role {
        admin
        user
    }

    type User {
        id: ID!
        name: String!
        email: String!
        role: Role!
    }

    extend type Mutation {
        borrow(id: ID!): BorrowResponse!
        return(id: ID!): BorrowResponse!
        history(): [BorrowResponse!]!
        mostBorrowedBooks(): [BorrowedBook!]!
        activeMembers(): [User!]!
    }
`