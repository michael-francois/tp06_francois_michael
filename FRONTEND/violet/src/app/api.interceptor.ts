import {Router} from "@angular/router";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Select} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {SecurityState} from "./states/securityState";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  @Select(SecurityState.getJWT) token: string | undefined;

  constructor(
    private readonly route: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token != undefined) {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        }
      });
    }

    return next.handle(request).pipe(
      tap({
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              void this.route.navigate(["/"]);
            }
          }
        }
      })
    );
  }
}
