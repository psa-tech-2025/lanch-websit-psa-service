import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnersInterceptor implements HttpInterceptor {

  constructor(private spinerservice: SpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinerservice.show()
    return next.handle(request).pipe(
      finalize(() => this.spinerservice.hide())
    );

  }
}
