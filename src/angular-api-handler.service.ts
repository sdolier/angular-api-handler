import { Injectable, Inject, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer }   from 'rxjs/Observer';
import {
    BrowserXhr, Connection, ConnectionBackend, Headers,
    Request, Response, RequestMethod, ReadyState,
    ResponseOptions, XHRBackend, XSRFStrategy
} from '@angular/http';

import { IAngularApiHandlerConfig, AngularApiHandlerConfig } from './angular-api-handler.config';
import { AngularApiHandlerRequestHandler } from './angular-api-handler.request-handler'

import { STATUS, STATUS_CODE_INFO } from './http-status-codes';

export abstract class AngularApiHandlerService {
    abstract getHandlers(): AngularApiHandlerRequestHandler[];
}

/**
 * Service for handling api requests
 *
 * Manages a list of request handlers for responding to api calls
 */
@Injectable()
export class AngularApiHandlerBackendService {

    /**
     * Global handler module configuration
     *
     * @type {AngularApiHandlerConfig}
     */
    protected config: IAngularApiHandlerConfig = new AngularApiHandlerConfig();

    /**
     * List of request handlers for processing requests
     */
    protected requestHandlers: AngularApiHandlerRequestHandler[];

    /**
     * Real http backend for passing through api requests
     */
    protected httpBackend: ConnectionBackend;

    constructor(
        private injector: Injector,
        private service: AngularApiHandlerService,
        @Inject(AngularApiHandlerConfig) @Optional() config: IAngularApiHandlerConfig
    ) {
        Object.assign(this.config, config || {});

        this.initHandlers();

        this.initHttpBackend();
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

    /**
     * Handle the api request
     *
     * If a handler is implemented for the request, allow it to handle the request
     *
     * Otherwise, either return an error or allow the request to pass through to the
     * http api endpoint
     *
     * @param req
     * @returns {Observable<Response>}
     */
    protected handleRequest(req: Request): Observable<Response> {
        console.log(this.config.forwardUnHandled);

        // if disabled, pass through the http backend
        if (!this.config.enabled) {
            return this.httpBackend.createConnection(req).response;
        }

        // find a handler
        for (let handler of this.requestHandlers) {
            let index: number = handler.isMatching(req.url);
            if (index !== -1) {
                return this.requestTypeHandler(req, handler, index);
            }
        }

        // forward to http backend
        if (this.config.forwardUnHandled) {
            return this.httpBackend.createConnection(req).response;
        }

        // 404 not found
        let errorResponse = this.createErrorResponse(STATUS.NOT_FOUND, 'api handler not found');
        return this.createObservableResponse(errorResponse);
    }

    /**
     * Handle the request based on the request type
     *
     * @param req
     * @param requestHandler
     * @param index
     * @returns {Observable<Response>}
     */
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

    /**
     * Create an observable for the response provided
     *
     * @param resOptions
     * @returns {Observable<Response>|"../../../Observable".Observable<Response>|"../../Observable".Observable<Response>}
     */
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
            return;
        });
    }

    /**
     * error response helper
     *
     * @param status
     * @param message
     * @returns {ResponseOptions}
     */
    protected createErrorResponse(status: number, message: string) {
        return new ResponseOptions({
            body: {'error': `${message}`},
            headers: new Headers({'Content-Type': 'application/json'}),
            status: status
        });
    }

    /**
     * is the status code a success code
     *
     * @param status
     * @returns {boolean}
     */
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

    /**
     * initialise the request handlers
     */
    protected initHandlers() {
        this.requestHandlers = this.service.getHandlers();
    }

    /**
     * initialise the http backend for passing requests through to
     */
    protected initHttpBackend() {
        const browserXhr = this.injector.get(BrowserXhr);
        const baseResponseOptions = this.injector.get(ResponseOptions);
        const xsrfStrategy = this.injector.get(XSRFStrategy);
        this.httpBackend = new XHRBackend(browserXhr, baseResponseOptions, xsrfStrategy);
    }
}