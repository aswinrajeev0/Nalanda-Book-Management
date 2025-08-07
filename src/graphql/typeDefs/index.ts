import { mergeTypeDefs } from "@graphql-tools/merge";
import { bookTypeDefs } from "./book.typeDefs";
import { userTypeDefs } from "./user.typeDefs";
import { borrowTypeDefs } from "./borrow.typeDefs";

export const typeDefs = mergeTypeDefs([
  `
    type Query
    type Mutation
  `,
  bookTypeDefs,
  userTypeDefs,
  borrowTypeDefs
]);