import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }  from '@angular/http';

import { AppComponent }   from './app.component';

import { AngularApiHandlerModule, AngularApiHandlerConfig } from 'angular-api-handler';
import { AngularApiHandlersService } from './angular-api-handler-service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AngularApiHandlerModule.forRoot(AngularApiHandlersService, new AngularApiHandlerConfig({ enabled: true }))
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
