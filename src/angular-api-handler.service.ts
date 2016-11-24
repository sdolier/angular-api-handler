import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer }   from 'rxjs/Observer';
import { Connection, Request, Response, RequestMethod, ReadyState, ResponseOptions } from '@angular/http';


import { IAngularApiHandlerConfig, AngularApiHandlerConfig } from './angular-api-handler.config';
import { AngularApiHandlerRequestHandler } from './angular-api-handler.request-handler'
import { STATUS, STATUS_CODE_INFO } from './http-status-codes';

export abstract class AngularApiHandlerService {
    blockAllHandlers: boolean = false;
    abstract getHandlers(): AngularApiHandlerRequestHandler[];
}

@Injectable()
export class AngularApiHandlerBackendService {

    protected config: AngularApiHandlerConfig = new AngularApiHandlerConfig();

    protected requestHandlers: any;

    constructor(
        private injector: Injector,
        private service: AngularApiHandlerService,
        @Inject(AngularApiHandlerConfig) @Optional() config: IAngularApiHandlerConfig
    ) {
        this.resetHandlers();

        Object.assign(this.config, config || {});
    }

    createConnection(req: Request): Connection {

        let response: Observable<Response>;

        response = this.handleRequest(req);

        return {
            readyState: ReadyState.Done,
            request: req,
            response
        };
    }

    protected handleRequest(req: Request): Observable<Response> {

        for (let handler of this.requestHandlers) {
            let index: number = handler.isMatching(req.url);
            if (index !== -1) {
                return this.requestTypeHandler(req, handler, index);
            }
        }
    }

    protected requestTypeHandler(req: Request, requestHandler: AngularApiHandlerRequestHandler, index: number): Observable<Response> {
        let resOptions: ResponseOptions;
        switch (req.method) {
            case RequestMethod.Get:
                resOptions = requestHandler.get(req, index);
                break;
            case RequestMethod.Post:
                resOptions = requestHandler.post(req, index);
                break;
            case RequestMethod.Put:
                resOptions = requestHandler.put(req, index);
                break;
            case RequestMethod.Delete:
                resOptions = requestHandler.delete(req, index);
                break;
            default:
                resOptions = requestHandler.errorResponse(STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
                break;
        }
        return this.createObservableResponse(resOptions);
    }

    protected createObservableResponse(resOptions: ResponseOptions): Observable<Response> {
        resOptions = this.setStatusText(resOptions);

        const res = new Response(resOptions);

        return new Observable<Response>((responseObserver: Observer<Response>) => {
            if (this.isSuccess(res.status)) {
                responseObserver.next(res);
                responseObserver.complete();
            } else {
                responseObserver.error(res);
            }
            return () => {};
        });
    }

    protected isSuccess(status: number): boolean {
        return status >= 200 && status < 300;
    }

    protected setStatusText(options: ResponseOptions) {
        try {
            const statusOption: string = 'statusText';
            const statusCode = STATUS_CODE_INFO[options.status];
            options[statusOption] = statusCode ? statusCode.text : 'Unknown Status';
            return options;
        } catch (err) {
            return new ResponseOptions({
                status: STATUS.INTERNAL_SERVER_ERROR,
                statusText: 'Invalid Server Operation'
            });
        }
    }

    protected resetHandlers() {
        this.requestHandlers = this.service.getHandlers();
    }
}