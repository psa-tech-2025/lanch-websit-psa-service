import {
  Component,
  OnInit
} from '@angular/core';

import {
  WhatsappCampaignService
} from '../services/whatsapp-campaign.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
  implements OnInit {


  user: any = null;

  loading = false;


stats = {

  numbers: 0,

  contacts: 0,

  campaigns: 0,

  sent: 0,

  delivered: 0,

  read: 0,

  failed: 0,

  skipped: 0

};


  constructor(
    private whatsappService:
      WhatsappCampaignService
  ) {}


  ngOnInit(): void {

    this.loadUser();

    this.loadDashboard();

  }


  loadUser(): void {

    const userData =
      localStorage.getItem('user');


    if (!userData) {
      return;
    }


    try {

      const parsed =
        JSON.parse(userData);

      this.user =
        parsed?.user ||
        parsed?.data ||
        parsed;

    } catch {

      this.user = null;

    }

  }


  loadDashboard(): void {

    this.loading = true;


    this.whatsappService
      .getDashboard()
      .subscribe({

        next: (response: any) => {

          this.loading = false;


          const data =
            response?.data ||
            response ||
            {};


          this.stats = {

  numbers:
    Number(data.numbers) || 0,

  contacts:
    Number(data.contacts) || 0,

  campaigns:
    Number(data.campaigns) || 0,

  sent:
    Number(data.sent) || 0,

  delivered:
    Number(data.delivered) || 0,

  read:
    Number(data.read) || 0,

  failed:
    Number(data.failed) || 0,

  skipped:
    Number(data.skipped) || 0

};
        },

        error: (error) => {

          this.loading = false;

          console.error(
            'Dashboard error:',
            error
          );

        }

      });

  }


  isSuperAdmin(): boolean {

    return (
      this.user?.role ===
      'SUPER_ADMIN'
    );

  }


  isCampaignManager(): boolean {

    return (
      this.user?.role ===
      'CAMPAIGN_MANAGER'
    );

  }


  isViewer(): boolean {

    return (
      this.user?.role ===
      'VIEWER'
    );

  }


  canManageCampaign(): boolean {

    return (
      this.isSuperAdmin() ||
      this.isCampaignManager()
    );

  }

}