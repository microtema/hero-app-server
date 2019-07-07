import {ApolloServer as ApolloServerExpress} from 'apollo-server-express';
import {Inject, Singleton} from 'typescript-ioc';
import {AddressService} from '../address';
import {AuthorService} from '../author';
import {BookService} from '../book';
import {sequelize} from '../repository/models';
import resolvers from '../repository/resolvers';
import schemas from '../repository/schemas';
import AppProperties from './App.properties';

@Singleton
export default class ApolloServer {

    // Create GPL Schema
    public readonly config = {
        context: (this.getContext.bind(this)),
        cors: true,
        playground: false,
        resolvers,
        typeDefs: schemas,
    };

    private readonly server: ApolloServerExpress;

    constructor(@Inject private authorService: AuthorService,
                @Inject private bookService: BookService,
                @Inject private addressService: AddressService,
                @Inject private appProperties: AppProperties) {

        this.config.playground = !this.appProperties.env.production;

        this.server = new ApolloServerExpress(this.config);
    }

    public applyMiddleware(express: any): Promise<any> {

        this.server.applyMiddleware({app: express});

        return this.asyncDatabase();
    }

    private asyncDatabase(): Promise<any> {

        return new Promise((resolve) => {

            // NOTE:  Automatically sync all models
            sequelize.sync({force: this.appProperties.cleanDatabase}).then(() => {
                const graphqlPath = this.server.graphqlPath;
                console.log(`Apollo Server is listening on ${graphqlPath}`);
                resolve({graphqlPath});
            });
        });
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
