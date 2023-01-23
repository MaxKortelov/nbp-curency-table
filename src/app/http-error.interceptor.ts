import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen } from 'rxjs/operators';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(() => {
        return next.handle(request).pipe(
          retryWhen((error) =>
            error.pipe(
              mergeMap((error, index) => {
                if (index < maxRetries) {
                  return of(error).pipe(delay(delayMs));
                }
                throw error;
              })
            )
          )
        );
      })
    );
  }
}
