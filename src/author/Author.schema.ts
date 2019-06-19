import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        author(id: ID): Author
        authors(name: String): [Author]
    }

    extend type Mutation {
        createAuthor(name: String): Author
        updateAuthor(id: ID,name: String): Author
        deleteAuthor(id: ID): Boolean
    }

    type Author {
        id: ID
        name: String
        books: [Book]
        addresses: [Address]
    }
`;
