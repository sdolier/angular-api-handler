import { AngularApiHandlerService, AngularApiHandlerRequestHandler } from "angular-api-handler";

import { HelloServiceHandler } from './service-handlers/hello-handler';

export class AngularApiHandlersService implements AngularApiHandlerService {

    blockAllHandlers: boolean = false;

    getHandlers(): AngularApiHandlerRequestHandler[] {
        return [
            new HelloServiceHandler()
        ];
    }
}