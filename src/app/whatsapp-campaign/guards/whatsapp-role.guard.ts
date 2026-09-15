import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { WhatsappRole } from '../models/whatsapp';

@Injectable({
  providedIn: 'root'
})
export class WhatsappRoleGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    console.log('🔥 WhatsApp Guard:', state.url);

    const user = this.getUser();

    console.log('👤 WhatsApp User:', user);

    // ------------------------------------
    // NOT LOGGED IN
    // ------------------------------------
    if (!user) {

      console.log('❌ User not logged in');

      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });

      return false;
    }

    // ------------------------------------
    // GET REQUIRED ROLES
    // ------------------------------------
    const allowedRoles =
      route.data['roles'] as WhatsappRole[];

    console.log('🎯 Allowed roles:', allowedRoles);

    // ------------------------------------
    // NO ROLE RESTRICTION
    // ------------------------------------
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    // ------------------------------------
    // CHECK ROLE
    // ------------------------------------
    if (allowedRoles.includes(user.role)) {

      console.log(
        '✅ WhatsApp access granted:',
        user.role
      );

      return true;
    }

    // ------------------------------------
    // UNAUTHORIZED
    // ------------------------------------
    console.log(
      '❌ WhatsApp access denied:',
      user.role
    );

    this.router.navigate([
      '/whatsapp-campaign/dashboard'
    ]);

    return false;
  }


  private getUser(): any {

    // ====================================
    // YOUR EXISTING AUTH TOKEN
    // ====================================

    const token =
      localStorage.getItem('token');

    if (token !== 'true') {
      return null;
    }


    // ====================================
    // YOUR CURRENT LOGIN IS ADMIN LOGIN
    // ====================================

    return {
      role: 'SUPER_ADMIN'
    };
  }
}