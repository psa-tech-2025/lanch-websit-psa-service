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
  popupImages: string[] = [
  '/assets/images/1.png',
  '/assets/images/2.png',
  '/assets/images/3.png'
];
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
diwaliMessage = `
  👋 Hello! Greetings from PSA TECH!

We are pleased to connect with you!

🏢 **PSA TECH – Professional Development & IT Solutions**

We provide professional digital and technology solutions, including:

✅ Website & Application Development  
✅ Digital Marketing & Business Promotion  
✅ AI Solutions & Business Automation  
✅ Industrial & Business Technology Solutions  
✅ Online Services, Training & Career Development  

Our goal is to help businesses grow with innovative, affordable and reliable digital solutions.

━━━━━━━━━━━━━━━━━━

 **Founder: Mr. Shailesh Pawar**

🌐 Website: https://www.psatechall.com

📝 Registration Number: 110023322503

📞 Contact: +91 8668267967

━━━━━━━━━━━━━━━━━━

✨ **PSA TECH – Your Digital TECH Partner**

We would be happy to discuss your requirements and explore how we can work together.

📞 **May I call you for a brief discussion, or could you please confirm a convenient time for a call?**

Looking forward to connecting with you!

**Regards,**  
**Mr. Shailesh Pawar**  
Founder – PSA TECH
`;


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
const englishDiwaliMessage = `
👋 Hello! Greetings from PSA TECH!

We are pleased to connect with you!

🏢 **PSA TECH – Professional Development & IT Solutions**

We provide professional digital and technology solutions, including:

✅ Website & Application Development  
✅ Digital Marketing & Business Promotion  
✅ AI Solutions & Business Automation  
✅ Industrial & Business Technology Solutions  
✅ Online Services, Training & Career Development  
Our goal is to help businesses grow with innovative, affordable and reliable digital solutions.
━━━━━━━━━━━━━━━━━━
 **Founder: Mr. Shailesh Pawar**

🌐 Website: https://www.psatechall.com

📝 Registration Number: 110023322503

📞 Contact: +91 8668267967

━━━━━━━━━━━━━━━━━━
We would be happy to discuss your requirements and explore how we can work together.

📞 आपल्याशी थोडक्यात चर्चेसाठी मी फोन करू का? किंवा कृपया फोनवर बोलण्यासाठी आपल्याला सोयीची तारीख आणि वेळ कळवावी.

आपल्याशी लवकरच संवाद साधण्यास उत्सुक आहोत!

धन्यवाद!

श्री. शैलेश पवार
संस्थापक – PSA TECH
`;


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
