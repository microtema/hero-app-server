import {Singleton} from 'typescript-ioc';

@Singleton
export default class AppProperties {

    public serverPort = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 4000;

    public cleanDatabase = process.env.CLEAN_DATABASE === 'true';

    public env = {production: process.env.NODE_ENV === 'production'};
}
