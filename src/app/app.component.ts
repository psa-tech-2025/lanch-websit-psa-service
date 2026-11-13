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
    this.router.url.startsWith('/live/') ||
     this.router.url === '/home' ||
    this.router.url.startsWith('/home/')
  );
}

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

// PSA TECH Diwali Wishes

// PSA TECH Diwali Wishes in Marathi
diwaliMessage = `🪔 दिवाळीच्या हार्दिक शुभेच्छा! 🪔

✨ दीपावलीच्या मंगलमय पर्वावर आपल्या जीवनात सुख, समृद्धी, आनंद, आरोग्य आणि यशाची नवी पहाट उजाडो!

आपणास व आपल्या परिवारास दिवाळीच्या मनःपूर्वक शुभेच्छा! 💐

━━━━━━━━━━━━━━━━━━
 संस्थापक: Mr. Shailesh Pawar
🌐 Website: https://www.psatechall.com

🏢 PSA TECH
Professional Development & IT Solutions
📝 Registration Number: 110023322503

📞 Contact: +91 8668267967
━━━━━━━━━━━━━━━━━━
✨ आपला डिजिटल टेक पार्टनर ✨`;


// Copy Diwali Wishes
async copyDiwaliMessage(): Promise<void> {
  try {
    await navigator.clipboard.writeText(this.diwaliMessage);

    alert('Diwali wishes copied successfully!');

  } catch (error) {
    console.error('Copy failed:', error);

    alert('Unable to copy. Please use HTTPS or localhost.');
  }
}

// // Share Diwali Wishes
// async shareDiwaliMessage(): Promise<void> {

//   const shareData = {
//     title: '🪔 Happy Diwali - PSA TECH',
//     text: this.diwaliMessage,
//     url: 'https://www.psatechall.com'
//   };

//   try {

//     if (navigator.share) {

//       await navigator.share(shareData);

//     } else {

//       await navigator.clipboard.writeText(this.diwaliMessage);

//       alert('Sharing is unavailable. Wishes copied instead!');

//     }

//   } catch (error) {

//     console.log('Share cancelled or failed:', error);

//   }
// }




// Copy English Diwali Wishes
async shareDiwaliMessage(): Promise<void> {


// PSA TECH Diwali Wishes in English
const englishDiwaliMessage = `🪔 Happy Diwali from PSA TECH! 🪔

✨ May this Diwali bring happiness, prosperity, success, and new opportunities to your life!

Wishing you and your family a Happy and Prosperous Diwali! 💐

━━━━━━━━━━━━━━━━━━
Proprietor: Mr. Shailesh Pawar

🌐 Website:  https://www.psatechall.com

🏢 PSA TECH
Professional Development & IT Solutions

📝 Registration Number: 110023322503

📞 Contact: +918668267967
━━━━━━━━━━━━━━━━━━
✨ Your Digital Technology Partner ✨`;


  try {

    await navigator.clipboard.writeText(englishDiwaliMessage);

    alert('English Diwali wishes copied successfully!');

  } catch (error) {

    console.error('Copy failed:', error);

    alert('Unable to copy. Please use HTTPS or localhost.');

  }

}





  }
// onKeyupMobile(event: any): void {
//   this.formValidators.IsNumberMobile(event, this.loginForm, 'number');
// }



// }
