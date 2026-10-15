import { Component, OnInit } from '@angular/core';
import { PopupService } from './common/services/popup.service';
import { FormvalidatorService } from './common/services/formvalidator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonConst } from './common/utility/common-const';
import { DiolougeService } from './share/Diolouge/diolouge/diolouge.service';
import { UserinfoComponent } from './userDetails/userinfo/userinfo.component';
import { PopupComponent } from './common/component/popup/popup.component';
import { HeaderComponent } from './common/shared/header/header.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter } from 'rxjs/internal/operators/filter';

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
   showPopup = true;
     showNavHeader = true;
  private routerSubscription?: Subscription;
  constructor(
  private router:Router) { }

    ngOnInit(): void {
          this.updateHeaderVisibility();

    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.updateHeaderVisibility();
      });

    // Show popup after 1 second
    setTimeout(() => {
      this.showPopup = true;
    }, 1000);

  }
    closePopup(){
    this.showPopup = false;
  }
isContactRoute(): boolean {
  return (
    this.router.url === '/free-consultation' ||
    this.router.url === '/business-website' ||
    this.router.url === '/govt-school'
  );
}
private updateHeaderVisibility(): void {
  this.showNavHeader = !(
    this.router.url === '/tech' ||
    this.router.url.startsWith('/tech/') ||
    this.router.url === '/live' ||
    this.router.url.startsWith('/live/')
  );
}

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  }
// onKeyupMobile(event: any): void {
//   this.formValidators.IsNumberMobile(event, this.loginForm, 'number');
// }



// }
