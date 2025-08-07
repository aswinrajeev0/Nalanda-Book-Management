import { container } from "tsyringe";
import { BookResponseDto } from "../../interfaces/dto/book.dto";
import { AddBookDto, AddBookSchema, UpdateBookDto, UpdateBookSchema } from "../../utils/shared/validation/book.schema";
import BookService from "../../services/book.service";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "../../utils/shared/constants";
import { GraphQLError } from "graphql";
import { GlobalUser } from "../../interfaces/dto/user.dto";

export const bookResolvers = {

    Query: {
        listBooks: async (
            _: any,
            args: { page?: number; limit?: number; genre?: string; author?: string },
            context: { user: GlobalUser | null }
        ) => {
            try {
                if (!context.user) {
                    throw new GraphQLError("Unauthorized", {
                        extensions: { code: "UNAUTHORIZED" }
                    });
                }
                const bookService = container.resolve(BookService);

                const page = args.page || 1;
                const limit = args.limit || 10;
                const skip = (page - 1) * limit;
                const genre = typeof args.genre === "string" ? args.genre : undefined;
                const author = typeof args.author === "string" ? args.author : undefined;

                const { books, totalPages } = await bookService.listBooks({ limit, skip, genre, author });

                return {
                    books,
                    totalPages,
                    page
                };
            } catch (error: any) {
                throw new GraphQLError(error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR, {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },
    },

    Mutation: {
        addBook: async (_: any, args: { bookData: AddBookDto }, context: { user: GlobalUser | null }) => {
            try {
                if (!context.user || context.user.role !== "admin") {
                    throw new GraphQLError("Unauthorized", {
                        extensions: { code: "UNAUTHORIZED" }
                    });
                }
                const bookService = container.resolve(BookService)
                const validatedData = AddBookSchema.parse(args.bookData)
                const book: BookResponseDto = await bookService.addBook(validatedData);

                return book
            } catch (error: any) {
                throw new GraphQLError(error.message || 'Failed to add book', {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        updateBook: async (_: any, args: { id: string, updateData: UpdateBookDto }, context: { user: GlobalUser | null }) => {
            try {
                if (!context.user || context.user.role !== "admin") {
                    throw new GraphQLError("Unauthorized", {
                        extensions: { code: "UNAUTHORIZED" }
                    });
                }
                const bookService = container.resolve(BookService);
                const validatedData = UpdateBookSchema.parse(args.updateData);
                const book = await bookService.updateBook(args.id, validatedData);
                return book
            } catch (error: any) {
                throw new GraphQLError(error.message || 'Failed to add book', {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        deleteBook: async (_: any, args: { id: string }, context: { user: any }) => {
            try {
                if (!context.user || context.user.role !== "admin") {
                    throw new GraphQLError("Unauthorized", {
                        extensions: { code: "UNAUTHORIZED" }
                    });
                }
                const bookService = container.resolve(BookService);
                await bookService.deleteBook(args.id);

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.RESOURCE_DELETED,
                }
            } catch (error: any) {
                throw new GraphQLError(error.message || 'Failed to add book', {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        }
    }
};