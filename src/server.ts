import {default as appolloServer} from './apollo.server';
import app from './app';

appolloServer.applyMiddleware({app});

const port = 5000;

app.listen(port, () => {

    console.log(`server is listening on http://localhost:${port} and graphqlPath: ${appolloServer.graphqlPath}`);

});
