import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';


import {
  DashboardComponent
} from './dashboard/dashboard.component';

import {
  WhatsappNumberComponent
} from './whatsapp-number/whatsapp-number.component';

import {
  AuthorizedUsersComponent
} from './authorized-users/authorized-users.component';

import {
  TemplatesComponent
} from './templates/templates.component';

import {
  CampaignComponent
} from './campaign/campaign.component';

import {
  ReportsComponent
} from './reports/reports.component';


import {
  WhatsappRoleGuard
} from './guards/whatsapp-role.guard';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [WhatsappRoleGuard],
    data: {
      roles: [
        'SUPER_ADMIN',
        'CAMPAIGN_MANAGER',
        'VIEWER'
      ]
    }
  },


  {
    path: 'numbers',
    component: WhatsappNumberComponent,
    canActivate: [WhatsappRoleGuard],
    data: {
      roles: [
        'SUPER_ADMIN'
      ]
    }
  },


  {
    path: 'authorized-users',
    component: AuthorizedUsersComponent,
    canActivate: [WhatsappRoleGuard],
    data: {
      roles: [
        'SUPER_ADMIN'
      ]
    }
  },


  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [WhatsappRoleGuard],
    data: {
      roles: [
        'SUPER_ADMIN'
      ]
    }
  },


  {
    path: 'campaigns',
    component: CampaignComponent,
    canActivate: [WhatsappRoleGuard],
    data: {
      roles: [
        'SUPER_ADMIN',
        'CAMPAIGN_MANAGER'
      ]
    }
  },


  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [WhatsappRoleGuard],
    data: {
      roles: [
        'SUPER_ADMIN',
        'CAMPAIGN_MANAGER',
        'VIEWER'
      ]
    }
  }

];


@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class WhatsappCampaignRoutingModule {}