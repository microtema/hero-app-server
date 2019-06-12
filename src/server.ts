import {Inject, Singleton} from 'typescript-ioc';
import ApolloServer from './apollo.server';
import app from './app';

@Singleton
class Server {

    @Inject
    private apolloServer: ApolloServer;

    constructor() {

        const port = 4000;
        const graphqlPath = this.apolloServer.server.graphqlPath;

        this.apolloServer.server.applyMiddleware({app});

        app.listen({port}, () => {

            console.log(`Server is listening on http://localhost:${port} and graphqlPath: ${graphqlPath}`);
        });
    }
}

export default new Server();
