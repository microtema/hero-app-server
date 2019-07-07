import bodyParser from 'body-parser';
import cors from 'cors';
import express, {Application} from 'express';
import {Request, Response} from 'express-serve-static-core';
import helmet from 'helmet';
import query from 'qs-middleware';
import {Inject, Singleton} from 'typescript-ioc';
import {AuthService} from '../auth';
import ApolloServer from './apollo.server';
import AppProperties from './App.properties';

@Singleton
export default class App {

    public readonly server: Application;

    constructor(@Inject private authService: AuthService,
                @Inject private apolloServer: ApolloServer,
                @Inject private appProperties: AppProperties) {

        this.server = express();

        this.applyUse();

        this.applyRoutes();
    }

    public start(): Promise<any> {

        const port = this.appProperties.serverPort;

        return new Promise((resolve) => {

            this.apolloServer.applyMiddleware(this.server).then(({graphqlPath}) => {

                this.server.listen({port}, () => resolve({port, graphqlPath}));
            });
        });
    }

    private applyUse(): void {

        /**
         * Secure Node.js server by setting various HTTP headers.
         */
        this.server.use(helmet());

        /**
         * Secure Node.js server by setting various HTTP headers.
         */
        this.server.use(helmet());

        /**
         * Node.js body parsing middleware.
         * Parse incoming request bodies in a middleware before your handlers,
         * available under the req.body property.
         */
        this.server.use(bodyParser.json());

        /**
         * Connect querystring middleware
         */
        this.server.use(query());

        /**
         * Enable All CORS Requests
         */
        this.server.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
            methods: ['OPTIONS', 'GET', 'POST'],
            origin: '*',
            preflightContinue: false,
        }));

        /**
         * Authenticate Requests with authService
         */
        this.server.use(this.authService.authenticateRequest.bind(this.authService));
    }

    private applyRoutes(): void {

        this.server.get('/', (request: Request, response: Response) => {

            response.send('Welcome to Graphql API Gateway');
        });
    }

}
