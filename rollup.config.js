export default {
    entry: './dist/index.js',
    dest: './dist/bundles/angular-api-handler.umd.js',
    format: 'umd',
    moduleName: 'ng.apiHandler',
    globals: {
        '@angular/core': 'ng.core',
        '@angular/http': 'ng.http',
        'rxjs/Observable': 'Rx'
    }
}