/**
 * Created by sdolier on 5/12/2016.
 */


/*global jasmine, __karma__, window*/
Error.stackTraceLimit = 5;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

__karma__.loaded = function() {};

function isJsFile(path) {
    return path.slice(-3) == '.js';
}

function isSpecFile(path) {
    return path.slice(-7) == 'spec.js';
}

function isBuiltFile(path) {
    var builtPath = '/base/src/';
    return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files).filter(isSpecFile).filter(isBuiltFile);

// Load our SystemJS configuration.
System.config({
    baseURL: '/base',
});

System.config({
    paths: {
        // paths serve as alias
        'npm:': 'node_modules/'
    },
    map: {
        src: 'src',
        // angular bundles
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

        'rxjs':                       'npm:rxjs',
        'system-polyfills': 'npm:systemjs/dist/system-polyfills.js',
        'core-js-shim':'npm:core-js/client/shim.min.js',
        'zone':'npm:zone.js/dist/zone.js',
        'reflect':'npm:reflect-metadata/Reflect.js',

        '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
        '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
        '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
        '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
        '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
    },
    packages: {
        src: {
            main: './index.js',
            defaultExtension: 'js'
        },
        rxjs: {
            defaultExtension: 'js'
        },
        'testing': {
            main: 'index.js',
            defaultExtension: 'js'
        }
    }
});

Promise
    .all([
        System.import('@angular/core/testing'),
        System.import('@angular/platform-browser-dynamic/testing')
    ])
    .then(function(providers) {
        var testing = providers[0];
        var testingBrowser = providers[1];

        testing.TestBed.initTestEnvironment(
            testingBrowser.BrowserDynamicTestingModule,
            testingBrowser.platformBrowserDynamicTesting());

    })
    .then(function() {
        // Finally, load all spec files.
        // This will run the tests directly.
        return Promise.all(
            allSpecFiles.map(function(moduleName) { return System.import(moduleName); }));
    })
    .then(__karma__.start, __karma__.error);