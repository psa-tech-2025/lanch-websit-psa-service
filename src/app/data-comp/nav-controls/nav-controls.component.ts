import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-nav-controls',
  templateUrl: './nav-controls.component.html',
  styleUrls: ['./nav-controls.component.css']
})
export class NavControlsComponent  {
   routes: string[];
  currentIndex = -1;

  constructor(private router: Router, public navService: NavigationService) {
      this.routes = this.navService.getRoutes();

          this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentIndex = this.routes.indexOf(event.urlAfterRedirects);
      }
    });
  }

    goPrev() {
    if (this.currentIndex > 0) {
      this.router.navigate([this.routes[this.currentIndex - 1]]);
    }
  }

    goNext() {
    if (this.currentIndex < this.routes.length - 1) {
      this.router.navigate([this.routes[this.currentIndex + 1]]);
    }
  }
   }




