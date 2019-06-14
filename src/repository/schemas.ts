import {gql} from 'apollo-server-express';
import {loadModules} from '../util/File.util';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, ...loadModules('.schema.ts')];
