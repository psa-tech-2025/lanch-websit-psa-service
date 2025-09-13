import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormvalidatorService } from 'src/app/common/services/formvalidator.service';
import { PopupService } from 'src/app/common/services/popup.service';
import { CommonConst } from 'src/app/common/utility/common-const';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
 loginForm: FormGroup;
   namepattern = CommonConst.NAME_PATTERN_STRING;
    emailpattern =CommonConst.EMAIL_PATTERN_STRING;
    mobilenumPattern = CommonConst.MOBILE_PATTERN_STRING;
  constructor(private popup:PopupService, public formValidators:FormvalidatorService , public fb:FormBuilder) { }

  ngOnInit(): void {
    this.userLogin()
  }
    userLogin() {
          this.loginForm = this.fb.group({
      number: ['', [Validators.required , Validators.pattern(this.mobilenumPattern)]],
      nominainame: ['', [Validators.required , Validators.pattern(this.namepattern)]],
      useremail: ['', [Validators.required , Validators.pattern(this.emailpattern)]]
    });

} 
onUserdata() {
  if(this.loginForm.valid) {
    console.log("this.loginForm",this.loginForm);
console.log("this.loginForm",this.loginForm.value);
    this.loginForm.reset()
  } else {
     this.popup.openPop("", "","", )
    console.log("enter proper")
  }

}

}
