import { NgModule } from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';


import {
  WhatsappCampaignRoutingModule
} from './whatsapp-campaign-routing.module';


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


@NgModule({

  declarations: [

    DashboardComponent,

    WhatsappNumberComponent,

    AuthorizedUsersComponent,

    TemplatesComponent,

    CampaignComponent,

    ReportsComponent

  ],

  imports: [

    CommonModule,

    FormsModule,

    WhatsappCampaignRoutingModule

  ]

})
export class WhatsappCampaignModule {}