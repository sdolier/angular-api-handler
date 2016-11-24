import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';

import { AppComponent }   from './app.component';

import { AngularApiHandlerModule } from 'angular-api-handler';
import { AngularApiHandlersService } from './angular-api-handler-service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AngularApiHandlerModule.forRoot(AngularApiHandlersService, {})
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
