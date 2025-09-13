import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValiditionMsgService } from '../services/validition-msg.service';

@Directive({
  selector: '[appFormError]'
})
export class FormErrorDirective  implements OnInit , OnDestroy{

  @Input() validationMsgId: string;
  @Input() show: string;
  errorSpanId: string = '';
  statusChangeSubscription: Subscription;
  descriptionNode: any;
  siblingElement: any;
  descriptionFlag: boolean =false;
  descriptionFlag2: boolean =false;
  constructor( private elementRef: ElementRef, private control: NgControl, private validationservice: ValiditionMsgService) { }
  ngOnInit(): void {
    if(this.elementRef.nativeElement.nextElementSibling) {
        this.descriptionNode = this.elementRef.nativeElement.nextElementSibling
    }
    this.errorSpanId =this.validationMsgId + new Date() + '-error-msg';
    console.log(" this.errorSpanId", this.errorSpanId)
    if(this.control.status === 'INVALID' && this.show ==='immediate') {
       const emptyNode = document.createElement('p');
        emptyNode.className = 'emptyNode';
         this.elementRef.nativeElement.parentElement.replaceChild(emptyNode, this.elementRef.nativeElement.nextElementSibling) 
         const formErrors: ValidationErrors = this.control.errors;
         console.log("I m here",formErrors)
          const errorKey = Object.keys(formErrors);
            errorKey.forEach(element => {
        if (formErrors[element] == 'immediate' || this.show == 'immediate') {

          this.showError();
        }
      });
    }
    this.statusChangeSubscription = this.control.statusChanges.subscribe((res) => {
      if(this.control.value.length > 0) {
        if(res==='INVALID') {
           const emptyNode = document.createElement('p');
          emptyNode.className = 'emptyNode'
          this.elementRef.nativeElement.parentElement.replaceChild(emptyNode, this.elementRef.nativeElement.nextElementSibling)
          const formErrors: ValidationErrors = this.control.errors;
          const errorKey = Object.keys(formErrors);
              errorKey.forEach(element => {
            if (formErrors[element] == 'immediate' || this.show == 'immediate') {
              this.showError();
            }
          });
          
        } else {
                    this.elementRef.nativeElement.parentElement.replaceChild(this.descriptionNode, this.elementRef.nativeElement.nextElementSibling)

        }
      } else {
            if (this.show == "immediate") {
          const formErrors: ValidationErrors = this.control.errors;
          const errorKey = Object.keys(formErrors);
          errorKey.forEach(element => {
            if (formErrors[element] == 'immediate') {
              this.showError();
            }
          });
        } else {
          this.elementRef.nativeElement.parentElement.replaceChild(this.descriptionNode, this.elementRef.nativeElement.nextElementSibling)
        }
      }
    })
  }
  ngOnDestroy(): void {
        this.statusChangeSubscription.unsubscribe();
  }
  // showError() {
  //      this.removeError();
  //      const errorKey: ValidationErrors= this.control.errors;
  //      const errorMsg =this.validationservice.getValidationMsg(`${this.validationMsgId}${errorKey}`);
  //      console.log(this.validationMsgId)
  //       console.log(errorKey)
  //       const errorNode =document.createElement('span');
  //       errorNode.innerHTML =`<span class=" text-danger" id=" ${this.errorSpanId}"> ${errorMsg} </span>`;
  //       console.log("errorNode",errorNode)
  //       console.log("errorMsg",errorMsg)
  //       this.siblingElement = this.elementRef.nativeElement.nextElementSibling;
  //           if (this.elementRef.nativeElement.nextElementSibling && !this.descriptionFlag2) {
  //                   this.descriptionFlag = true;
  //     this.elementRef.nativeElement.parentElement.replaceChild(errorNode, this.elementRef.nativeElement.nextElementSibling);
  //           } else {
  //                   this.descriptionFlag2 = true;
  //     this.elementRef.nativeElement.parentElement.insertAdjacentElement('beforeend', errorNode);

  //           }
  // }
  showError() {
  this.removeError();

  const errorKeyObj: ValidationErrors = this.control.errors;
  if (!errorKeyObj) return;

  const errorKey = Object.keys(errorKeyObj)[0];  // e.g., "required"
  const errorMsg = this.validationservice.getValidationMsg(`${this.validationMsgId}${errorKey}`);

  console.log("validationMsgId", this.validationMsgId);
  console.log("errorKey", errorKey);
  console.log("errorMsg", errorMsg);

  if (!errorMsg) {
    console.warn("No matching error message found.");
    return;
  }

  const errorNode = document.createElement('span');
  errorNode.innerHTML = `<span class="text-danger" id="${this.errorSpanId}"> ${errorMsg} </span>`;
  console.log("errorNode", errorNode);

  this.siblingElement = this.elementRef.nativeElement.nextElementSibling;

  if (this.siblingElement && !this.descriptionFlag2) {
    this.descriptionFlag = true;
    this.elementRef.nativeElement.parentElement.replaceChild(errorNode, this.siblingElement);
  } else {
    this.descriptionFlag2 = true;
    this.elementRef.nativeElement.parentElement.insertAdjacentElement('beforeend', errorNode);
  }
}

  removeError() {
     const errorElement = document.getElementById(this.errorSpanId);
      if(errorElement) errorElement.remove();
        if (this.descriptionFlag) {
            this.elementRef.nativeElement.parentElement.replaceChild(this.descriptionNode, this.elementRef.nativeElement.nextElementSibling);
      this.descriptionFlag = false;
      this.descriptionFlag2 = false;
        }
  }

  @HostListener('keypress', ["$event"])
  handleKeypressEvent () {
       this.statusChangeSubscription = this.control.statusChanges.subscribe((response) => {
      if (response === 'VALID') {
        this.removeError();
        this.elementRef.nativeElement.parentElement.replaceChild(this.descriptionNode, this.elementRef.nativeElement.nextElementSibling);
      }
    })
  }
  @HostListener('blur',['$event'])
  handleBlurEvent() {
      if (this.control.errors) {
      this.showError();
    } else {
      this.removeError();
    }
  }
}
