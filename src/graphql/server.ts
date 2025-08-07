import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { json } from 'body-parser';
import cors from 'cors';
import { Express } from 'express';
import { verifyToken } from '../utils/jwt';
import { GlobalUser } from '../interfaces/dto/user.dto';

interface GraphQLContext {
    user: GlobalUser | null;
}

export async function setupGraphQL(app: Express) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }):Promise<GraphQLContext> => {
                const token = req.headers.authorization?.split(" ")[1];
                let user: GlobalUser | null = null;

                if (token) {
                    try {
                        user = verifyToken(token) as GlobalUser;
                    } catch (err: any) {
                        console.warn("Invalid token:", err.message);
                    }
                }

                return { user };
            }
        })
    );
}
