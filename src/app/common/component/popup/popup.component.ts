import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit , OnDestroy {
  alertstart: boolean = false;
  btnEvent: any;
  buttonsJSON: any;
  btnText: any;
  position: any;
  type: any;
  message: any;
  svgNumber: any;
  alertHide: boolean =false;
  boldMessage: any;
  constructor( private popupservice: PopupService , private router : Router) {
    this.router.events.subscribe((event:Event) => {
      if( event instanceof NavigationEnd) {
        this.alertstart=false
      }
    })
   }

  ngOnInit(): void {
   this.alertStart();
  }
  alertStart() {
    this.popupservice.popData.subscribe((data:any) => {
        console.log(data);
        if(data) {
        this.alertHide = true;
        this.boldMessage = data.boldMessage;
        this.svgNumber = data.svgNumber;
        this.message = data.message;
        this.type = data.type;
        this.position = data.position;
        this.btnText = data.btnText;
        this.buttonsJSON = data.buttonsJSON;
        this.btnEvent = data.btnEvent;          
        }
        })
  }
  ngOnDestroy(): void {
    
  }
  removeAlert() {
    this.alertHide=true
  }
    close() {
    this.alertHide = false;
  }

    onClick(route:any) {
    this.alertHide = false;
    this.router.navigateByUrl(route);
  }

  btnAction() {

  }

}
