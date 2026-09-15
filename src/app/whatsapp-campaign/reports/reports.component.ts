import { Component, OnInit } from '@angular/core';
import { WhatsappCampaignService } from '../services/whatsapp-campaign.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: any[] = [];

  loading = false;

  from = '';
  to = '';

  summary = {
    total: 0,
    sent: 0,
    delivered: 0,
    read: 0,
    failed: 0
  };

  constructor(
    private whatsappService: WhatsappCampaignService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {

    this.loading = true;

    this.whatsappService
      .getReports(
        this.from || undefined,
        this.to || undefined
      )
      .subscribe({

        next: (response: any) => {

          this.loading = false;

          const data =
            response?.data ||
            response ||
            {};

          this.reports =
            data.reports ||
            data.campaigns ||
            [];

          this.summary = {
            total:
              data.total ||
              data.totalMessages ||
              0,

            sent:
              data.sent ||
              data.messagesSent ||
              0,

            delivered:
              data.delivered ||
              data.messagesDelivered ||
              0,

            read:
              data.read ||
              data.messagesRead ||
              0,

            failed:
              data.failed ||
              data.messagesFailed ||
              0
          };
        },

        error: (error) => {

          this.loading = false;

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to load reports.'
          );
        }
      });
  }

  clearFilter(): void {

    this.from = '';
    this.to = '';

    this.loadReports();
  }
}