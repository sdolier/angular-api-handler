import { Request, ResponseOptions } from '@angular/http';

import {AngularApiHandlerRequestHandler} from "angular-api-handler";

export class HelloServiceHandler extends AngularApiHandlerRequestHandler {

    matchingUrlsRegex: [{ url: string, data?: any }] = [
        {
            url: 'api/hello.*'
        }
    ];

    get(req: Request, index: number): ResponseOptions {
        let responseBody = { message: "Hello from mock API Handler"};

        console.log('mocking response for ' + req.url);
        console.log(responseBody);

        return this.successResponse(responseBody);
    }
}