import {ApolloServer, ApolloServerExpressConfig, gql} from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

export const config = {
    context: ({req}) => ({req}), // pass in the request to allow for authorization
    resolvers,
    typeDefs,
} as ApolloServerExpressConfig;

const server = new ApolloServer(config);

export default server;
