import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AlertService } from '../_services/alert.service';
import { catchError } from 'rxjs/operators';
import { ErrorResult } from '../_modals/error-result';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alert: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        const err = error.error as ErrorResult;
        this.alert.newAlert({
          message: err.statusCode === 500 ?  'Server Error' : err.message,
          type: 'error'
        });
        return throwError(error);
      })
    );
  }
}
