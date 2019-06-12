import {ApolloServer as ApolloServerExpress, gql} from 'apollo-server-express';
import {Inject, Singleton} from 'typescript-ioc';
import AuthorService from './author/AuthorService';
import BookService from './book/BookService';

@Singleton
export default class ApolloServer {

    private static instance: ApolloServer;
    public readonly server: ApolloServerExpress;

    public readonly resolvers = {
        Query: {
            author(parent, {id}, {req}, info) {

                return ApolloServer.instance.authorService.getAuthor(id);
            },
            authors(parent, {name}, {req}, info) {

                return ApolloServer.instance.authorService.getAuthors({name});
            },
            book(parent, {id}, {req}, info) {

                return ApolloServer.instance.bookService.getBook(id);
            },
            books(parent, {title}, {req}, info) {

                return ApolloServer.instance.bookService.getBooks({title});
            },
        },
    };

    public readonly typeDefs = gql`
        type Query {
            author(id: ID): Author
            authors(name: String): [Author]
            book (id: ID): Book
            books (title: String): [Book]
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
        context: ({req}) => ({req}), // pass in the request to allow for authorization
        resolvers: this.resolvers,
        typeDefs: this.typeDefs,
    };

    constructor(@Inject private authorService: AuthorService, @Inject private bookService: BookService) {

        this.server = new ApolloServerExpress(this.config);

        // NOTE This is important on resolvers, since the scope of Query functions is not this.
        ApolloServer.instance = this;
    }
}
