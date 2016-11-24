import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';

import { AppComponent }   from './app.component';

import { AngularApiHandlerModule, AngularApiHandlerService } from 'angular-api-handler';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AngularApiHandlerModule.forRoot(AngularApiHandlerService, {})
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
