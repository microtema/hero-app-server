import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        book (id: ID): Book
        books (title: String): [Book]
    }

    extend type Mutation {
        createBook(title: String, authorId: ID): Book
        updateBook(id: ID, title: String): Book
        deleteBook(id: ID): Boolean
    }

    type Book {
        id: ID
        title: String
        author: Author
    }
`;
