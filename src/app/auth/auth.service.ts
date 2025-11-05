import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly allowedEmail = 'service@gmail.com';
  private readonly allowedPassword = 'psa@123';
  private loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  loginStatus$ = this.loginStatus.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string) {
    if (email !== this.allowedEmail || password !== this.allowedPassword) {
      alert('Unauthorized user');
      return;
    }
    // ✅ Just set token; no Firebase needed
    localStorage.setItem('token', 'true');
    this.loginStatus.next(true);
    this.router.navigate(['/admin/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loginStatus.next(false);
    this.router.navigate(['/login']);
  }

  hasToken(): boolean { return localStorage.getItem('token') === 'true'; }
  isLoggedIn(): boolean { return this.loginStatus.value; }
}
