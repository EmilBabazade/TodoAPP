import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ClarityModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
