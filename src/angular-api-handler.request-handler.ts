
import { Headers, Request, ResponseOptions } from '@angular/http';

import { STATUS } from './http-status-codes';

/**
 * Base class for implementing a request handler
 */
export abstract class AngularApiHandlerRequestHandler {

    /**
     * default response headers
     *
     * @type {Headers}
     */
    protected headers: Headers = new Headers({ 'Content-Type': 'application/json' });

    /**
     * URL pattern match for selecting this handler
     */
    abstract matchingUrlsRegex: [{ url: string, data?: any }];

    /**
     * enable this individual handler
     */
    private enabled;

    constructor(enabled: boolean = true) {
        this.enabled = enabled;
    };

    //////// request handlers ////////

    get(req: Request, index: number): ResponseOptions {
        return this.defaultSuccessReponse(index);
    }

    post(req: Request, index: number): ResponseOptions {
        return this.defaultSuccessReponse(index);
    }

    put(req: Request, index: number): ResponseOptions {
        return this.defaultSuccessReponse(index);
    }

    delete(req: Request, index: number): ResponseOptions {
        return this.defaultSuccessReponse(index);
    }

    isMatching(url: string): number {
        if (this.enabled) {
            for (let i = 0; i < this.matchingUrlsRegex.length; i++) {
                if (new RegExp(this.matchingUrlsRegex[i].url).test(url)) {
                    return i;
                }
            }
        }
        return -1;
    }

    protected clone(data: any) {
        return JSON.parse(JSON.stringify(data));
    }

    protected defaultSuccessReponse(index: number): ResponseOptions {
        if (this.matchingUrlsRegex[index].data !== null) {
            return this.successResponse(this.matchingUrlsRegex[index].data);
        }
        return this.successResponse({});
    }

    protected successResponse(data: Object): ResponseOptions {
        return new ResponseOptions({
            body: this.clone(data),
            headers: this.headers,
            status: STATUS.OK
        });
    }

    errorResponse(status: number, message: string) {
        return new ResponseOptions({
            body: {'error': `${message}`},
            headers: new Headers({'Content-Type': 'application/json'}),
            status: status
        });
    }
}