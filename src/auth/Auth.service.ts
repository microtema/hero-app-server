import azureJwtVerify from 'azure-jwt-verify';
import {Request, Response} from 'express-serve-static-core';
import {Singleton} from 'typescript-ioc';

@Singleton
export default class AuthService {

    private readonly authorizationRegex = new RegExp('Bearer\\s[\\d|a-f]{8}-([\\d|a-f]{4}-){3}[\\d|a-f]{12}');

    private readonly tenant = '41567caa-2f7d-4d52-8ed3-eb6b36fd70dd';
    private readonly clientId = 'd39004ce-286d-4c84-8b37-145e237addaa';
    private readonly server = 'https://login.microsoftonline.de';

    private readonly config = {
        AUD: this.clientId,
        ISS: `${this.server}/${this.tenant}/v2.0`,
        JWK_URI: `${this.server}/${this.tenant}/discovery/v2.0/keys`,
    };

    public authenticateRequest(request: Request, response: Response, next: any) {

        const {authorization} = request.headers as any;

        if (!this.isValidAuthorization(authorization)) {

            response.status(401);
            response.send('Invalid authorization header!');
        } else {

            const token = authorization.split(' ')[1];

            this.verify(token)
                .then((it) => this.successHandler(it, request, next),
                    (it) => this.errorHandler(it, response));
        }
    }

    public isValidAuthorization(authorization?: string) {

        return this.authorizationRegex.test(authorization || '');
    }

    public verify(token?: string) {

        return azureJwtVerify.verify(token, this.config);
    }

    public errorHandler(error: any, response: Response): void {

        console.warn('Error Handler:', error);

        response.status(401);
        response.send('Invalid authorization token!');
    }

    public successHandler(jwt: any, request: any, next: any): void {

        console.info('Success Handler: ', jwt);

        const claims = JSON.parse(jwt);
        const username = claims.message.preferred_username.split('@')[0];

        request.user = {username};

        next();
    }

}
