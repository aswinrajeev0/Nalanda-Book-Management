import { mergeResolvers } from "@graphql-tools/merge";
import { bookResolvers } from "./book.resolver";

export const resolvers = mergeResolvers([
  bookResolvers,
//   userResolvers,
//   borrowResolvers
]);