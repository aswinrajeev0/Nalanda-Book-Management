import { mergeResolvers } from "@graphql-tools/merge";
import { bookResolvers } from "./book.resolver";
import { borrowResolvers } from "./borrow.resolver";
import { userResolvers } from "./user.resolver";

export const resolvers = mergeResolvers([
  bookResolvers,
  userResolvers,
  borrowResolvers
]);