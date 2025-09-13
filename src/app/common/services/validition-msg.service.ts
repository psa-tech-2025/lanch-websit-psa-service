import { Injectable } from '@angular/core';
import { Message } from '../utility/message';

@Injectable({
  providedIn: 'root'
})
export class ValiditionMsgService {

  constructor() { }
    public getValidationMsg(validationId) {
      console.log("validationId",validationId)
    return Message.errorMsg[validationId];
  }
}
