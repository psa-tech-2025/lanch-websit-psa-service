import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {
   isAdminLoggedIn = false;
  private subscription!: Subscription;
  isEditing = false;
  constructor(
        private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
    private storage: Storage
  ) { }

  ngOnInit(): void {
        this.subscription = this.authService.loginStatus$.subscribe(status => {
      this.isAdminLoggedIn = status;
    });
  }
    ngOnDestroy() {
    this.subscription.unsubscribe();
  }
    logout() {
    this.authService.logout();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
