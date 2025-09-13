import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormvalidatorService {
  OsType: any;

  constructor() { }
public HasError(
    formGroup: FormGroup,
    field: string,
    errorProperty: string,
    isTouchedRequired: boolean = true
  ): boolean {
    return (
      formGroup &&
      formGroup.controls &&
      formGroup.controls[field] &&
      (isTouchedRequired ? formGroup.controls[field].touched : true) &&
      formGroup.controls[field].errors &&
      formGroup?.controls?.[field].errors?.[errorProperty]
    );
  }

  public FieldHasSpecificError(){

  }
   public FieldHasErrors(
    formGroup: FormGroup,
    field: string,
    isTouchedRequired: boolean = true
  ): boolean {
    return (
      formGroup &&
      formGroup.controls &&
      formGroup.controls[field] &&
      (isTouchedRequired ? formGroup.controls[field].touched : true) &&
      formGroup.controls[field].errors != null
    );
  }

// public IsNumberMobile($event: any, formGroup: any, field: string): any {
//   if (!formGroup || !formGroup.controls || !formGroup.controls[field]) {
//     return false;
//   }

//   if (this.OsType?.toLowerCase() === "android") {
//     $event.target.value = $event.target.value.toString().replace(/[^\d]/g, "");

//     const control = formGroup.controls[field];
//     const value = control?.value;
//     console.log("dcdfvdv",value)

//     if (value !== null && value !== undefined && value !== '') {
//       control.setValue(value.toString().replace(/[^\d]/g, ""));
//     }

//     const errorProperty = 'required'; // Change to desired property
//     const hasError = control?.errors?.[errorProperty];  // ✅ Safe access

//     if (hasError) {
//       console.log(`Field ${field} has ${errorProperty} error`);
//     }

//     return false;
//   }

//   return true;
// }

IsNumberMobile(event: any, formGroup: FormGroup, field: string): any {
  const input = event.target.value;
  const numeric = input.replace(/\D/g, '');
  event.target.value = numeric;

  // Update form control if needed
  const control = formGroup.get(field);
  if (control) {
    control.setValue(numeric);
  }
}

  public IsAlphabet($event: any) {
    if (this.OsType.toLowerCase() !== "android") {
      const charCode = $event.which ? $event.which : $event.keyCode;
      return !(
        (charCode > 32 &&
          (charCode < 65 || charCode > 90) &&
          (charCode < 97 || charCode > 122)) ||
        charCode == 8377
      );
    } else {
      let charStatus;
      charStatus = $event.key
        .toString()
        .match(/[0-9~`!#$%\^&*+=\-\[\]\\';,/()_{}|\\":<>\?₹]/g);
      if (charStatus) {
        return false;
      } else {
        return true;
      }
    }
  }




}
