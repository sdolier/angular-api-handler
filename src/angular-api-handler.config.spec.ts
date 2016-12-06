import { AngularApiHandlerConfig, IAngularApiHandlerConfig } from './angular-api-handler.config'

describe('config', () => {

    let config: IAngularApiHandlerConfig;

    beforeEach(() => {
        config = null;
    });

    it('should set default values', () => {
        config = new AngularApiHandlerConfig();

        expect(config.enabled).toBeTruthy();
        expect(config.forwardUnHandled).toBeFalsy();
    });

    it('should set properties from constructor', () => {
        config = new AngularApiHandlerConfig({ enabled: false, forwardUnHandled: true });

        expect(config.enabled).toBeFalsy();
        expect(config.forwardUnHandled).toBeTruthy();
    });
});