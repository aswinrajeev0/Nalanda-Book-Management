import { mergeTypeDefs } from "@graphql-tools/merge";
import { bookTypeDefs } from "./book.typeDefs";
import { userTypeDefs } from "./user.typeDefs";

export const typeDefs = mergeTypeDefs([
  `
    type Query
    type Mutation
  `,
  bookTypeDefs,
  userTypeDefs,
//   borrowTypeDefs
]);