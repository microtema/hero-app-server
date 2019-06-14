import 'dotenv/config';
import {Inject, Singleton} from 'typescript-ioc';
import ApolloServer from './app/apollo.server';
import app from './app/app';
import {sequelize} from './repository/models';

/**
 * Entry point of the application
 */
@Singleton
class Server {

    @Inject
    private apolloServer: ApolloServer;

    constructor() {

        const port = process.env.SERVER_PORT || 4000;
        const eraseDatabaseOnSync = process.env.CLEAN_DATABASE === 'true';
        const graphqlPath = this.apolloServer.server.graphqlPath;

        console.log(`Server is starting on environment: ${process.env.environment}`);

        this.apolloServer.server.applyMiddleware({app});

        // NOTE:  Automatically sync all models
        sequelize.sync({force: eraseDatabaseOnSync}).then(() => {

            console.log('Connected to to database successfully');

            app.listen({port}, () => {

                console.log(`Server is listening on http://localhost:${port}${graphqlPath}`);
            });
        });
    }
}

export default new Server();
