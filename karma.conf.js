// #docregion
module.exports = function(config) {

    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher'
        ],

        customLaunchers: {
            // From the CLI. Not used here but interesting
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        files: [
            { pattern: 'src/*.spec.js', included: true, watched: true }
        ],

        colors: true,
        browsers: ['Chrome']
    });
};