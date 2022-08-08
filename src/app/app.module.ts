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
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmLogoutComponent } from './_modals/confirm-logout/confirm-logout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDeleteComponent } from './_modals/todo-delete/todo-delete.component';
import { TodoNewComponent } from './todo-new/todo-new.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ConfirmLogoutComponent,
    TodoListComponent,
    TodoDeleteComponent,
    TodoNewComponent,
    TodoEditComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ClarityModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
