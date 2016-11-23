import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';

import { AppComponent }   from './app.component';

import { AngularApiHandlerModule } from 'angular-api-handler';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AngularApiHandlerModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
