
import {Injector, Type} from '@angular/core';
import { XHRBackend, HttpModule } from '@angular/http';

import { TestBed, inject } from '@angular/core/testing';

import { AngularApiHandlerService, AngularApiHandlerBackendService } from './angular-api-handler.service';
import { AngularApiHandlerRequestHandler } from './angular-api-handler.request-handler';
import { AngularApiHandlerConfig, IAngularApiHandlerConfig } from './angular-api-handler.config'


export class TestAngularApiHandlerService extends AngularApiHandlerService {

    getHandlers(): AngularApiHandlerRequestHandler[] {
        return [];
    }
}

describe('service', () => {

    let config: IAngularApiHandlerConfig;
    let backend: AngularApiHandlerBackendService;

    beforeEach(() => {

        config = new AngularApiHandlerConfig();

        TestBed
            .configureTestingModule({
                providers: [
                    { provide: AngularApiHandlerService, useClass: TestAngularApiHandlerService },
                    { provide: AngularApiHandlerConfig, useValue: config },
                    {
                        provide: XHRBackend,
                        useFactory: (injector: Injector,
                                     service: AngularApiHandlerService,
                                     config: AngularApiHandlerConfig) => {
                            let backend: any = new AngularApiHandlerBackendService(injector, service, config);
                            return (<XHRBackend>backend);
                        },
                        deps: [Injector, AngularApiHandlerService, AngularApiHandlerConfig]
                    }
                ],
                imports: [
                    HttpModule
                ]
            });
    });

    beforeEach(inject([XHRBackend], (backendService: AngularApiHandlerBackendService) => {
        backend = backendService;
    }));

    it('should create an instance of AngularApiHandlerBackendService', () => {
        expect(backend instanceof AngularApiHandlerBackendService).toBeTruthy();
    });
});