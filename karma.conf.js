// #docregion
module.exports = function(config) {

    var configuration = {

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
    };

    if(process.env.TRAVIS){
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};