import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  # Enum for role
  enum Role {
    user
    admin
  }

  # User object type
  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: String
    updatedAt: String
  }

  # Input for creating a user
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  # Response for single user
  type UserResponse {
    success: Boolean!
    message: String!
    user: User
  }

  # Response for list of users
  type UsersListResponse {
    success: Boolean!
    message: String!
    users: [User!]!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    user: User!
    token: String!
  }

  # Root Mutation
  extend type Mutation {
    register(userData: CreateUserInput!): UserResponse!
    login(loginData: LoginInput!): LoginResponse!
  }
`;
