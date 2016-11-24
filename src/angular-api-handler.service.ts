import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Connection, Request, Response } from '@angular/http';


import { IAngularApiHandlerConfig, AngularApiHandlerConfig } from './angular-api-handler.config';

@Injectable()
export class AngularApiHandlerService {

    protected config: AngularApiHandlerConfig = new AngularApiHandlerConfig();

    protected requestHandlers: any;

    constructor(
        private injector: Injector,
        private service: AngularApiHandlerService,
        @Inject(AngularApiHandlerConfig) @Optional() config: IAngularApiHandlerConfig
    ) {
        Object.assign(this.config, config || {});
    }

    createConnection(req: Request): Connection {

        return null;
    }
}