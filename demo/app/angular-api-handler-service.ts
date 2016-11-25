import { AngularApiHandlerService, AngularApiHandlerRequestHandler } from "angular-api-handler";

import { HelloServiceHandler } from './service-handlers/hello-handler';

export class AngularApiHandlersService implements AngularApiHandlerService {

    getHandlers(): AngularApiHandlerRequestHandler[] {
        return [
            new HelloServiceHandler()
        ];
    }
}