import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status == 401) {
        const isContinue =confirm('Are you sure you want to continue?');
        if(isContinue) {
          userService.tokenExpired$.next(true);
        }
      }
      return throwError(error);
    })
  );
};
