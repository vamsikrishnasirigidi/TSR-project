import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalServiceService } from '../services/localStorage/local-service.service';
import { AuthService } from 'src/app/modules/Auth/services/auth-service/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private tostr: ToastrService,
    private local: LocalServiceService,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.local.getToken();
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    } else {
      request = request.clone({
        headers: request.headers,
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.local.errorLoader.emit(false);
        if (error?.status == 401) {
          this.tostr.error(error.error.message);
          // this.local.clear();
          // this.router.navigateByUrl('/auth/signIn');
        }
        if (error?.status == 500) {
          if (error.error.error === 'Internal Server Error') {
            this.tostr.error('Something went wrong. Please try again');
          } else {
            this.tostr.error(error.error.message);
          }
        }
        if (error.error.message === 'Token is Expired') {
          this.auth.refreshToken().subscribe((res: any) => {
            this.local.setItem('accessToken', res.data.token);
            this.local.setItem('refreshToken', res.data.refreshToken);
          });
        } else {
          this.tostr.error(error.error.message);
        }
        return throwError(error);
      })
    );
  }
}
