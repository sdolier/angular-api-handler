import { Injector, NgModule, ModuleWithProviders, Type } from '@angular/core';
import { XHRBackend } from '@angular/http';

import { IAngularApiHandlerConfig, AngularApiHandlerConfig } from './angular-api-handler.config';
import { AngularApiHandlerService, AngularApiHandlerBackendService } from './angular-api-handler.service'

export function angularApiHandlerBackendServiceFactory(
    injector: Injector,
    service: AngularApiHandlerService,
    config: AngularApiHandlerConfig
): XHRBackend {
    let backend: any = new AngularApiHandlerBackendService(injector, service, config);
    return (<XHRBackend>backend);
}

@NgModule({
    providers: [ { provide: XHRBackend,
        useFactory: angularApiHandlerBackendServiceFactory,
        deps: [Injector, AngularApiHandlerService, AngularApiHandlerConfig]} ]
})
export class AngularApiHandlerModule {

    /**
     *  Configure Module
     *
     * @returns {{ngModule: AngularApiHandlerModule, providers: Array}}
     */
    static forRoot(service: Type<AngularApiHandlerService>, config?: IAngularApiHandlerConfig) : ModuleWithProviders {
        return {
            ngModule: AngularApiHandlerModule,
            providers: [
                { provide: AngularApiHandlerService, useClass: service },
                { provide: AngularApiHandlerConfig, useValue: config }
            ]
        };
    }
}