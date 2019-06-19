import {ApolloServer as ApolloServerExpress} from 'apollo-server-express';
import {Inject, Singleton} from 'typescript-ioc';
import {AddressService} from '../address';
import {AuthorService} from '../author';
import {BookService} from '../book';
import resolvers from '../repository/resolvers';
import schemas from '../repository/schemas';

@Singleton
export default class ApolloServer {

    public readonly server: ApolloServerExpress;

    // Create GPL Schema
    public readonly config = {
        context: (this.getContext.bind(this)),
        resolvers,
        typeDefs: schemas,
    };

    constructor(@Inject private authorService: AuthorService,
                @Inject private bookService: BookService,
                @Inject private addressService: AddressService) {

        this.server = new ApolloServerExpress(this.config);
    }

    /*
     * Pass in the request and services to keep resolvers cleaner
     */
    private getContext({req}): any {
        return {
            addressService: this.addressService,
            authorService: this.authorService,
            bookService: this.bookService,
            req,
            user: null,
        };
    }
}
