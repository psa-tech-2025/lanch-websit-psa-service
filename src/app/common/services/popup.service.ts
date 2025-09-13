import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
private popNotify = new BehaviorSubject<any>(null);
public popData = this.popNotify.asObservable()
  constructor() { }
  openPop( message: any, type: any, position: any) {
  let data = { message, type, position };
  this.popNotify.next(data)
}
  showPop(svgNumber: any, boldMessage: any, message: any, type: any, position: any, btnText: any, btnEvent: any, buttonsJSON: any = "") {
    let data = { svgNumber, boldMessage, message, type, position, btnText, btnEvent, buttonsJSON };
    this.popNotify.next(data)
  }
}

