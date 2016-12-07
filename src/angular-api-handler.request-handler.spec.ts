
import { Request, ResponseOptions, BaseRequestOptions } from "@angular/http";

import { AngularApiHandlerRequestHandler } from "./angular-api-handler.request-handler";
import { STATUS } from './http-status-codes';


export class TestRequestHandler extends AngularApiHandlerRequestHandler {
    matchingUrlsRegex: [{ url: string, data?: any }] = [
        {
            url: 'api/test.*',
            data: [
                 { 'test': 'data' },
                 { 'test2': 'data2' }
            ]
        },
        { url: 'api/another-test.*' }
    ];
}

describe('request handler', () => {

    let handler: TestRequestHandler;

    beforeEach(() => {
        handler = new TestRequestHandler();
    });

    it('should match request handlers to correct request url', () => {
        expect(handler.isMatching('api/test.json')).toEqual(0);
    });

    it('should return the correct index of the matched request url', () => {
        expect(handler.isMatching('api/another-test.json')).toEqual(1);
    });

    it('should not match request handlers to non matching request urls', () => {
        expect(handler.isMatching('api/miss.json')).toEqual(-1);
    });

    it('should not match request handler to correct request url if disabled', () => {
        handler.enabled = false;
        expect(handler.isMatching('api/test.json')).toEqual(-1);
    });

    it('should return a default success response if no get handler implemented', () => {
        let request: Request = new Request(new BaseRequestOptions());
        let response: ResponseOptions = handler.get(request, 0);

        expect(response.status).toEqual(STATUS.OK);
        expect(response.body).toBeDefined();
    });

    it('should return a default success response if no post handler implemented', () => {
        let request: Request = new Request(new BaseRequestOptions());
        let response: ResponseOptions = handler.post(request, 0);

        expect(response.status).toEqual(STATUS.OK);
        expect(response.body).toBeDefined();
    });

    it('should return a default success response if no put handler implemented', () => {
        let request: Request = new Request(new BaseRequestOptions());
        let response: ResponseOptions = handler.put(request, 0);

        expect(response.status).toEqual(STATUS.OK);
        expect(response.body).toBeDefined();
    });

    it('should return a default success response if no delete handler implemented', () => {
        let request: Request = new Request(new BaseRequestOptions());
        let response: ResponseOptions = handler.delete(request, 0);

        expect(response.status).toEqual(STATUS.OK);
        expect(response.body).toBeDefined();
    });
});