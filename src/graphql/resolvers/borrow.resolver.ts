import { container } from "tsyringe";
import { GlobalUser } from "../../interfaces/dto/user.dto";
import BorrowService from "../../services/borrow.service";
import { GraphQLError } from "graphql";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../utils/shared/constants";

export const borrowResolvers = {
    Query: {

    },

    Mutation: {
        borrow: async (_: any, args: { bookId: string }, context: { user: GlobalUser | null }) => {
            try {
                if (!context.user) {
                    throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED, {
                        extensions: {
                            code: HTTP_STATUS.UNAUTHORIZED
                        }
                    });
                }
                const borrowService = container.resolve(BorrowService);
                const borrow = await borrowService.borrowBook(args.bookId, context.user.id);

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.RESOURCE_CREATED,
                    borrow
                }
            } catch (error: any) {
                throw new GraphQLError(error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        return: async (_: any, args: { id: string }, context: { user: GlobalUser | null }) => {
            try {
                if (!context.user) {
                    throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED, {
                        extensions: {
                            code: HTTP_STATUS.UNAUTHORIZED
                        }
                    })
                }
                const borrowService = container.resolve(BorrowService);
                const borrow = await borrowService.returnBook(args.id);

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.RESOURCE_UPDATED,
                    borrow
                }
            } catch (error: any) {
                throw new GraphQLError(error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
                    }
                })
            }
        },

        history: async (_: any, args: {}, context: { user: GlobalUser | null }) => {
            try {
                if (!context.user) {
                    throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED, {
                        extensions: {
                            code: HTTP_STATUS.UNAUTHORIZED
                        }
                    })
                }

                const borrowService = container.resolve(BorrowService);
                const borrows = await borrowService.borrowHistory(context.user.id);

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.RESOURCE_FETCHED,
                    borrows
                }

            } catch (error: any) {
                throw new GraphQLError(error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
                    }
                })
            }
        },

        mostBorrowedBooks: async (_: any, args: {}, context: { user: GlobalUser | null }) => {
            try {
                if (!context.user || context.user.role !== "admin") {
                    throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED, {
                        extensions: {
                            code: HTTP_STATUS.UNAUTHORIZED
                        }
                    })
                }

                const borrowService = container.resolve(BorrowService);
                const data = await borrowService.mostBorrowedBooks();

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.RESOURCE_FETCHED,
                    data
                }
            } catch (error: any) {
                throw new GraphQLError(error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
                    }
                })
            }
        },

        activeMembers: async (_: any, args: {}, context: { user: GlobalUser | null }) => {
            try {
                if(!context.user || context.user.role !== "admin"){
                    throw new GraphQLError(ERROR_MESSAGES.UNAUTHORIZED, {
                        extensions: {
                            code: HTTP_STATUS.UNAUTHORIZED
                        }
                    })
                }

                const borrowService = container.resolve(BorrowService);
                const data = await borrowService.activeUsers();

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.RESOURCE_FETCHED,
                    data
                }
            } catch (error: any) {
                throw new GraphQLError(error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
                    }
                })
            }
        }
    }
}