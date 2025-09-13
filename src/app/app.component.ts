import { Component, OnInit } from '@angular/core';
import { PopupService } from './common/services/popup.service';
import { FormvalidatorService } from './common/services/formvalidator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonConst } from './common/utility/common-const';
import { DiolougeService } from './share/Diolouge/diolouge/diolouge.service';
import { UserinfoComponent } from './userDetails/userinfo/userinfo.component';
import { PopupComponent } from './common/component/popup/popup.component';
import { HeaderComponent } from './common/shared/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-demo';
   loginForm: FormGroup;
   namepattern = CommonConst.NAME_PATTERN_STRING;
   emailpattern =CommonConst.EMAIL_PATTERN_STRING;
   mobilenumPattern = CommonConst.MOBILE_PATTERN_STRING;
  userRouteDate = true
  constructor(private popup:PopupService, public formValidators:FormvalidatorService ,
     public fb:FormBuilder ,private dialog: DiolougeService, private router:Router) {
        // this.popup.showPop("1", "","ksjhjdgsdsd", "", "","ClOSE","")

  }

  ngOnInit(): void {
    // this.  dopen();
    // this.loginForm.setValue({
    //   number:this.userData.mobile,
    //   nominainame: this.userData.name,
    //   useremail: this.userData.email
    // })
  
  }

    isContactRoute(): boolean {
    return this.router.url === '/contact';
  }
  dopen() {
    const ref = this.dialog.open(HeaderComponent, { 
      hasBackdrop: true,
      width: screen.width > 768 ? "40%" : "100%",
      height: "inherit",
      padding: "20px",
      position: screen.width > 768 ? {} : { bottom: "0", position: screen.width > 768 ? "relative" : "absolute" }

    });
        ref.afterClosed.subscribe((result) => {
      console.log(result);
    });

    }
  }
// onKeyupMobile(event: any): void {
//   this.formValidators.IsNumberMobile(event, this.loginForm, 'number');
// }



// }
