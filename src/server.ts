import 'dotenv/config';
import {Inject, Singleton} from 'typescript-ioc';
import App from './app/app';

/**
 * Entry point of the application
 */
@Singleton
class Server {

    @Inject
    private app: App;

    constructor() {

        this.app.start().then(({port}) => {
            console.log(`Server is listening on http://localhost:${port}`);
        });
    }
}

export default new Server();
