import { Request, ResponseOptions } from '@angular/http';

import {AngularApiHandlerRequestHandler} from "angular-api-handler";

export class HelloServiceHandler extends AngularApiHandlerRequestHandler {

    matchingUrlsRegex: [{ url: string, data?: any }] = [
        {
            url: 'api/hello.*'
        }
    ];

    get(req: Request, index: number): ResponseOptions {
        return this.successResponse({ message: "Hello Mock API Handler"});
    }
}