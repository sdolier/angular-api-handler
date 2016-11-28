# Angular API Handler

Handle API requests through the implementation of request handlers.

Ideal for:
- mocking API responses during development and testing
- transforming api requests/responses
- caching API responses

# Installation instructions

Install `angular-api-handler` from `npm`
```bash
npm install angular-api-handler --save
```

# Getting Started

Create request handlers that implement `AngularApiHandlerRequestHandler` for each api endpoint.

```ts
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
```

Implement `AngularApiHandlerService` that defines the list of request handlers.

```ts
import { AngularApiHandlerService, AngularApiHandlerRequestHandler } from "angular-api-handler";

import { HelloServiceHandler } from './service-handlers/hello-handler';

export class AngularApiHandlersService implements AngularApiHandlerService {

    getHandlers(): AngularApiHandlerRequestHandler[] {
        return [
            new HelloServiceHandler()
        ];
    }
}
```

Register the module in the `@NgModule.imports` with optional module configuration.

```ts
import { HttpModule }  from '@angular/http';

import { AngularApiHandlerModule, AngularApiHandlerConfig } from 'angular-api-handler';
import { AngularApiHandlersService } from './angular-api-handler-service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AngularApiHandlerModule.forRoot(AngularApiHandlersService, new AngularApiHandlerConfig({ enabled: true }))
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
```