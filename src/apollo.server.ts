import {ApolloServer as ApolloServerExpress, gql} from 'apollo-server-express';
import {Inject, Singleton} from 'typescript-ioc';
import AuthorService from './author/AuthorService';
import BookService from './book/BookService';

@Singleton
export default class ApolloServer {

    public readonly server: ApolloServerExpress;

    public readonly resolvers = {
        Query: {
            author(parent, {id}, {authorService}, info) {

                return authorService.getAuthor(id);
            },
            authors(parent, {name}, {authorService}, info) {

                return authorService.getAuthors({name});
            },
            book(parent, {id}, {bookService}, info) {

                return bookService.getBook(id);
            },
            books(parent, {title}, {bookService}, info) {

                return bookService.getBooks({title});
            },
        },

        Mutation: {
            createAuthor(parent, {name}, {authorService}, info) {

                return authorService.createAuthor({name});
            },

            updateAuthor(parent, {id, name}, {authorService}, info) {

                return authorService.updateAuthor({id, name});
            },

            deleteAuthor(parent, {id}, {authorService}, info) {

                return authorService.deleteAuthor(id);
            },

            createBook(parent, {title, authorId}, {bookService}, info) {

                return bookService.createBook({title, authorId});
            },

            updateBook(parent, {id, title}, {bookService}, info) {

                return bookService.updateBook({id, title});
            },

            deleteBook(parent, {id}, {bookService}, info) {

                return bookService.deleteBook(id);
            },
        },
    };

    // Create GPL Schema
    public readonly typeDefs = gql`
        type Query {
            author(id: ID): Author
            authors(name: String): [Author]
            book (id: ID): Book
            books (title: String): [Book]
        }

        type Mutation {
            createAuthor(name: String): Author
            updateAuthor(id: ID,name: String): Author
            deleteAuthor(id: ID): Boolean
            createBook(title: String, authorId:ID): Book
            updateBook(id: ID, title: String): Book
            deleteBook(id: ID): Boolean
        }

        type Book {
            id: ID
            title: String
            author: Author
        }

        type Author {
            id: ID
            name: String
            books: [Book]
        }
    `;

    public readonly config = {
        context: ({req}) => ({
            authorService: this.authorService,
            bookService: this.bookService,
            req,
        }), // pass in the request and services to keep resolvers cleaner
        resolvers: this.resolvers,
        typeDefs: this.typeDefs,
    };

    constructor(@Inject private authorService: AuthorService, @Inject private bookService: BookService) {

        this.server = new ApolloServerExpress(this.config);
    }
}
