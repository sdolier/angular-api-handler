import { Injector, NgModule, ModuleWithProviders, Type } from '@angular/core';
import { XHRBackend } from '@angular/http';

import { IAngularApiHandlerConfig, AngularApiHandlerConfig } from './angular-api-handler.config';
import { AngularApiHandlerService } from './angular-api-handler.service'

export function angularApiHandlerServiceFactory(
    injector: Injector,
    service: AngularApiHandlerService,
    config: AngularApiHandlerConfig
): XHRBackend {
    let backend: any = new AngularApiHandlerService(injector, service, config);
    return (<XHRBackend>backend);
}

@NgModule({
    providers: [ { provide: XHRBackend,
        useFactory: angularApiHandlerServiceFactory,
        deps: [Injector, AngularApiHandlerService, AngularApiHandlerConfig]} ]
})
export class AngularApiHandlerModule {

    /**
     *  Configure Module
     *
     * @returns {{ngModule: AngularApiHandlerModule, providers: Array}}
     */
    static forRoot(service: Type<AngularApiHandlerService>, config: IAngularApiHandlerConfig) : ModuleWithProviders {
        return {
            ngModule: AngularApiHandlerModule,
            providers: [
                { provide: AngularApiHandlerService, useValue: service },
                { provide: AngularApiHandlerConfig, useValue: config }
            ]
        };
    }
}