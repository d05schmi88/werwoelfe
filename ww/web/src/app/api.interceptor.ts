import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private environment;

  constructor(
    private injector: Injector,
    @Inject('environment') environment
  ) {
    this.environment = environment;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.debug('URL: ' + request.url);
    if (request.url.indexOf('api/') >= 0) {
      request = this.addEnvironment(request);
      console.debug('New URL: ' + request.url);
    }

    if (request.params.get("skipErrorHandling") == "" + true) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse && err.status != 200) {
            const appErrorHandler = this.injector.get(ErrorHandler);
            appErrorHandler.handleError(err);
          }
        }
      })
    );
  }

  private addEnvironment(apiReq): HttpRequest<any> {

    console.debug('Is localhost: ' + this.environment.localhost);
    if (this.environment.localhost) {
      apiReq = apiReq.clone({ url: `${this.getBaseLocationWithServer()}${apiReq.url}` });
      console.debug('Not in prod mode using localhost.')
    }
    return apiReq;
  }

  private getBaseLocationWithServer() {

    if (this.environment.localhost) {
      return `http://localhost:8080${this.getBaseLocation()}`;
    } else {
      return this.getBaseLocation();
    }
  }

  private getBaseLocation() {

    let paths: string[] = location.pathname.split('/').splice(1, 1);
    let basePath: string = (paths && paths[0]) || ''; // Default: my-account
    console.debug(`Calls path: ${basePath} Location: ${location.pathname}`)
    if (basePath.length === 0) {
      return ''
    } else {
      return location.pathname;
    }
  }
}