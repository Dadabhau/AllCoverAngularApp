import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  // Intercept Method
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add authentication headers to the request
    const token = localStorage.getItem('token'); // Assuming you have stored the token in localStorage

    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Allways need retrun this function
    return next.handle(request);

    //Modufied Requset multiple clone object
    // const modifiedRequset = req.clone({
    //   headers: req.headers.append('Auth', 'xyz'),
    // });
    // Allways call new modified requset
    // return next.handle(modifiedRequset);

    //Response Interceptor
    // return next.handle(modifiedRequset).pipe(
    //   tap((event) => {
    //     console.log(event);
    //     if (event.type === HttpEventType.Response) {
    //       console.log('Response arrived, body data: ');
    //       console.log(event.body);
    //     }
    //   })
    // );
  }
}
