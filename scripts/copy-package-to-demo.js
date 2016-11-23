var copydir = require('copy-dir');

copydir('./dist', './demo/angular-api-handler-dist', function(err){
    if(err){
        console.log(err);
    } else {
        console.log('ok');
    }
});