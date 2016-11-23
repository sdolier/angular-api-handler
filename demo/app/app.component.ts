import { Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-app',
    template: '<h1>{{message}}</h1>'
})

export class AppComponent {

    message: String;

    constructor(private http: Http){
        this.http.get('api/hello.json')
            .toPromise()
            .then((response) => {
                this.message = response.json().message;
            })
    }
}
