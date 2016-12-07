
import { AngularApiHandlerRequestHandler } from "./angular-api-handler.request-handler";

export class TestRequestHandler extends AngularApiHandlerRequestHandler {

    matchingUrlsRegex: [{ url: string, data?: any }] = [
        {
            url: 'api/test.*'
        }
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

});