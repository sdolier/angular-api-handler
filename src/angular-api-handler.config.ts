import { Injectable } from '@angular/core';

export interface IAngularApiHandlerConfig {
    /**
     * Enable or disable the entire handler
     */
    enabled?: boolean

    /**
     * If a request is not handled, allow it to instantiate a real http api call
     */
    forwardUnHandled?: boolean
}

@Injectable()
export class AngularApiHandlerConfig implements IAngularApiHandlerConfig {
    constructor(config: IAngularApiHandlerConfig = {}) {
        // Specify default configuration options
        Object.assign(
            this,
            {
                enabled: true,
                forwardUnHandled: false
            },
            config
        );
    }
}