import { NgModule, ModuleWithProviders } from '@angular/core';

import { IAngularApiHandlerConfig, AngularApiHandlerConfig } from './angular-api-handler.config';

@NgModule()
export class AngularApiHandlerModule {

    /**
     *  Configure Module
     *
     * @returns {{ngModule: AngularApiHandlerModule, providers: Array}}
     */
    static forRoot(config: IAngularApiHandlerConfig) : ModuleWithProviders {
        return {
            ngModule: AngularApiHandlerModule,
            providers: [
                { provide: AngularApiHandlerConfig, useValue: config }
            ]
        };
    }
}