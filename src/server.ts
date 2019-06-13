import environment from 'custom-env';
import {Inject, Singleton} from 'typescript-ioc';
import ApolloServer from './apollo.server';
import app from './app';
import {sequelize} from './database/models';
// use the current environment at top level
environment.env(true);

@Singleton
class Server {

    @Inject
    private apolloServer: ApolloServer;

    constructor() {

        const port = 4000;
        const graphqlPath = this.apolloServer.server.graphqlPath;

        this.apolloServer.server.applyMiddleware({app});

        // NOTE:  Automatically sync all models
        sequelize.sync().then(() => {

            console.log('connect to to database successfully');

            app.listen({port}, () => {

                console.log(`Server is listening on http://localhost:${port} and graphqlPath: ${graphqlPath}`);
            });
        });
    }
}

export default new Server();
