import { GraphQLError } from "graphql";
import { LoginDto, LoginSchema, RegisterDto, RegisterSchema } from "../../utils/shared/validation/auth.schema";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../utils/shared/constants";
import { container } from "tsyringe";
import AuthService from "../../services/auth.service";

export const userResolvers = {
    Mutation: {
        register: async (_: any, args: { registerData: RegisterDto }) => {
            try {
                const authService = container.resolve(AuthService);
                const validatedData = RegisterSchema.parse(args.registerData);
                const user = await authService.register(validatedData);

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.USER_REGISTERED,
                    user
                }
            } catch (error: any) {
                throw new GraphQLError(error.message || 'Failed to add book', {
                    extensions: {
                        code: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    }
                });
            }
        },

        login: async (_: any, args: { loginData: LoginDto }) => {
            try {
                const authService = container.resolve(AuthService);
                const validatedData = LoginSchema.parse(args.loginData);
                const user = await authService.login(validatedData);

                return {
                    success: true,
                    message: SUCCESS_MESSAGES.USER_LOGGED_IN,
                    user
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
}