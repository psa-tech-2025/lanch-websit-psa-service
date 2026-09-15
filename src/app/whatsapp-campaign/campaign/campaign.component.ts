import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  WhatsappCampaignService
} from '../services/whatsapp-campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent
  implements OnInit, OnDestroy {
      Math = Math;

  whatsappNumbers: any[] = [];
  templates: any[] = [];
  campaigns: any[] = [];

  selectedWhatsappNumberId = '';
  campaignName = '';
  templateName = '';
  languageCode = 'en_US';

  selectedFile: File | null = null;

  totalContacts = 0;
  optInContacts = 0;
  skippedWithoutOptIn = 0;
  invalidContacts = 0;
  duplicateContacts = 0;

  campaignId: string | null = null;
  campaignStatus = 'draft';

  selectedCampaign: any = null;

  loading = false;
  loadingNumbers = false;
  loadingTemplates = false;
  loadingCampaigns = false;
  sending = false;
  loadingDetails = false;

  testMode = false;

  private statusTimer: any = null;
  recipients: any[] = [];

recipientPage = 1;
recipientLimit = 25;
recipientTotal = 0;
recipientPages = 0;

recipientSearch = '';
recipientStatus = '';

loadingRecipients = false;

  constructor(
    private campaignService: WhatsappCampaignService
  ) {}

  ngOnInit(): void {
    this.loadWhatsappNumbers();
    this.loadTemplates();
    this.loadCampaigns();
  }
  // --------------------------------------------------
// LOAD CAMPAIGN RECIPIENTS
// --------------------------------------------------

loadRecipients(
  campaignId: string,
  page: number = 1
): void {

  this.loadingRecipients = true;

  this.recipientPage = page;

  this.campaignService
    .getCampaignRecipients(
      campaignId,
      this.recipientPage,
      this.recipientLimit,
      this.recipientStatus,
      this.recipientSearch
    )
    .subscribe({

      next: (response: any) => {

        this.loadingRecipients = false;

        this.recipients =
          response?.data ||
          [];

        const pagination =
          response?.pagination ||
          {};

        this.recipientPage =
          pagination.page ||
          1;

        this.recipientLimit =
          pagination.limit ||
          25;

        this.recipientTotal =
          pagination.total ||
          0;

        this.recipientPages =
          pagination.pages ||
          0;
      },

      error: (error) => {

        this.loadingRecipients = false;

        console.error(
          'Recipient loading error:',
          error
        );

        alert(
          error?.error?.message ||
          'Unable to load campaign recipients.'
        );
      }
    });
}


// --------------------------------------------------
// SEARCH RECIPIENTS
// --------------------------------------------------

searchRecipients(): void {

  if (!this.selectedCampaign?._id) {
    return;
  }

  this.loadRecipients(
    this.selectedCampaign._id,
    1
  );
}


// --------------------------------------------------
// FILTER RECIPIENT STATUS
// --------------------------------------------------

filterRecipients(): void {

  if (!this.selectedCampaign?._id) {
    return;
  }

  this.loadRecipients(
    this.selectedCampaign._id,
    1
  );
}


// --------------------------------------------------
// CHANGE PAGE
// --------------------------------------------------

changeRecipientPage(
  page: number
): void {

  if (
    page < 1 ||
    page > this.recipientPages
  ) {
    return;
  }

  if (!this.selectedCampaign?._id) {
    return;
  }

  this.loadRecipients(
    this.selectedCampaign._id,
    page
  );
}


// --------------------------------------------------
// CLEAR RECIPIENT FILTERS
// --------------------------------------------------

clearRecipientFilters(): void {

  this.recipientSearch = '';
  this.recipientStatus = '';

  if (this.selectedCampaign?._id) {

    this.loadRecipients(
      this.selectedCampaign._id,
      1
    );
  }
}


// --------------------------------------------------
// RECIPIENT STATUS CLASS
// --------------------------------------------------

getRecipientStatusClass(
  status: string
): string {

  switch (
    (status || '').toLowerCase()
  ) {

    case 'sent':
      return 'recipient-sent';

    case 'delivered':
      return 'recipient-delivered';

    case 'read':
      return 'recipient-read';

    case 'failed':
      return 'recipient-failed';

    case 'skipped':
      return 'recipient-skipped';

    case 'queued':
      return 'recipient-queued';

    default:
      return 'recipient-queued';
  }
}


// --------------------------------------------------
// RECIPIENT STATUS ICON
// --------------------------------------------------

getRecipientStatusIcon(
  status: string
): string {

  switch (
    (status || '').toLowerCase()
  ) {

    case 'sent':
      return 'fa-paper-plane';

    case 'delivered':
      return 'fa-check-double';

    case 'read':
      return 'fa-eye';

    case 'failed':
      return 'fa-circle-xmark';

    case 'skipped':
      return 'fa-forward';

    case 'queued':
      return 'fa-clock';

    default:
      return 'fa-clock';
  }
}

  ngOnDestroy(): void {
    this.stopPolling();
  }

  // --------------------------------------------------
  // LOAD WHATSAPP NUMBERS
  // --------------------------------------------------

  loadWhatsappNumbers(): void {
    this.loadingNumbers = true;

    this.campaignService
      .getWhatsappNumbers()
      .subscribe({
        next: (response: any) => {
          this.loadingNumbers = false;

          this.whatsappNumbers =
            response?.data ||
            response?.numbers ||
            response ||
            [];
        },

        error: (error) => {
          this.loadingNumbers = false;

          console.error(
            'Unable to load WhatsApp numbers',
            error
          );
        }
      });
  }

  // --------------------------------------------------
  // LOAD APPROVED TEMPLATES
  // --------------------------------------------------

  loadTemplates(): void {
    this.loadingTemplates = true;

    this.campaignService
      .getTemplates()
      .subscribe({
        next: (response: any) => {
          this.loadingTemplates = false;

          const allTemplates =
            response?.data ||
            response?.templates ||
            response ||
            [];

          this.templates = allTemplates.filter(
            (template: any) =>
              template.active !== false &&
              template.status === 'APPROVED'
          );
        },

        error: (error) => {
          this.loadingTemplates = false;

          console.error(
            'Unable to load WhatsApp templates',
            error
          );
        }
      });
  }

  // --------------------------------------------------
  // TEMPLATE CHANGE
  // --------------------------------------------------

  onTemplateChange(): void {
    const selectedTemplate =
      this.templates.find(
        (template: any) =>
          template.name === this.templateName
      );

    if (selectedTemplate?.language) {
      this.languageCode =
        selectedTemplate.language;
    }
  }

  // --------------------------------------------------
  // FILE SELECT
  // --------------------------------------------------

  onFileSelected(event: any): void {

    const file =
      event.target.files?.[0];

    if (!file) {
      this.selectedFile = null;
      return;
    }

    const extension =
      file.name
        .split('.')
        .pop()
        ?.toLowerCase();

    if (
      ![
        'xlsx',
        'xls',
        'csv'
      ].includes(extension || '')
    ) {
      alert(
        'Please select XLSX, XLS or CSV file.'
      );

      event.target.value = '';
      this.selectedFile = null;

      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      alert(
        'File size must be less than 10 MB.'
      );

      event.target.value = '';
      this.selectedFile = null;

      return;
    }

    this.selectedFile = file;

    this.resetImportSummary();

    this.campaignId = null;
    this.campaignStatus = 'draft';
    this.selectedCampaign = null;
    this.testMode = false;
  }

  // --------------------------------------------------
  // RESET SUMMARY
  // --------------------------------------------------

  resetImportSummary(): void {

    this.totalContacts = 0;
    this.optInContacts = 0;
    this.skippedWithoutOptIn = 0;
    this.invalidContacts = 0;
    this.duplicateContacts = 0;
  }

  // --------------------------------------------------
  // IMPORT CONTACTS
  // --------------------------------------------------

  importContacts(): void {

    if (!this.selectedWhatsappNumberId) {
      alert(
        'Please select WhatsApp number.'
      );
      return;
    }

    if (!this.campaignName.trim()) {
      alert(
        'Please enter campaign name.'
      );
      return;
    }

    if (!this.templateName.trim()) {
      alert(
        'Please select approved template.'
      );
      return;
    }

    if (!this.selectedFile) {
      alert(
        'Please select Excel/CSV file.'
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      'campaignName',
      this.campaignName.trim()
    );

    formData.append(
      'templateName',
      this.templateName.trim()
    );

    formData.append(
      'languageCode',
      this.languageCode
    );

    formData.append(
      'whatsappNumberId',
      this.selectedWhatsappNumberId
    );

    formData.append(
      'bodyParameters',
      JSON.stringify([])
    );

    formData.append(
      'file',
      this.selectedFile,
      this.selectedFile.name
    );

    this.loading = true;

    this.campaignService
      .importCampaign(formData)
      .subscribe({
        next: (response: any) => {

          this.loading = false;

          this.campaignId =
            response?.campaignId ||
            response?.data?.campaignId ||
            null;

          this.totalContacts =
            response?.total ||
            response?.data?.total ||
            0;

          this.optInContacts =
            response?.optInCount ||
            response?.data?.optInCount ||
            0;

          this.skippedWithoutOptIn =
            response?.skippedWithoutOptIn ||
            response?.data?.skippedWithoutOptIn ||
            0;

          this.invalidContacts =
            response?.invalid ||
            response?.data?.invalid ||
            0;

          this.duplicateContacts =
            response?.duplicates ||
            response?.data?.duplicates ||
            0;

          this.campaignStatus = 'draft';
          this.selectedCampaign = null;

          this.loadCampaigns();

          alert(
            'Contacts imported successfully.'
          );
        },

        error: (error) => {

          this.loading = false;

          console.error(
            'Import campaign error:',
            error
          );

          alert(
            error?.error?.message ||
            'Unable to import contacts.'
          );
        }
      });
  }

  // --------------------------------------------------
  // SEND CAMPAIGN
  // --------------------------------------------------

  sendCampaign(): void {

    if (!this.campaignId) {
      alert(
        'Please import contacts first.'
      );
      return;
    }

    if (this.optInContacts <= 0) {
      alert(
        'No opted-in contacts available.'
      );
      return;
    }

    if (
      this.campaignStatus === 'processing'
    ) {
      alert(
        'Campaign is already processing.'
      );
      return;
    }

    if (
      !confirm(
        `Are you sure you want to start this campaign?\n\n` +
        `Opted-in contacts: ${this.optInContacts}`
      )
    ) {
      return;
    }

    this.sending = true;

    this.campaignService
      .startCampaign(this.campaignId)
      .subscribe({

        next: (response: any) => {

          this.sending = false;

          this.testMode =
            response?.testMode === true;

          this.campaignStatus =
            'processing';

          this.loadCampaigns();

          this.pollCampaignStatus(
            this.campaignId as string
          );

          alert(
            response?.message ||
            'Campaign started successfully.'
          );
        },

        error: (error) => {

          this.sending = false;

          console.error(
            'Start campaign error:',
            error
          );

          alert(
            error?.error?.message ||
            'Unable to start campaign.'
          );
        }
      });
  }

  // --------------------------------------------------
  // POLL CAMPAIGN STATUS
  // --------------------------------------------------

  pollCampaignStatus(
    campaignId: string
  ): void {

    this.stopPolling();

    const checkStatus = () => {

      this.campaignService
        .getCampaign(campaignId)
        .subscribe({

          next: (response: any) => {

            const campaign =
              response?.campaign ||
              response?.data ||
              response;

            if (!campaign) {
              return;
            }

            this.selectedCampaign =
              campaign;

            this.campaignStatus =
              campaign.status ||
              'processing';

            this.totalContacts =
              campaign.total || 0;

            this.optInContacts =
              (campaign.sent || 0) +
              (campaign.queued || 0);

            this.skippedWithoutOptIn =
              campaign.skipped || 0;

            if (
              campaign.status === 'processing'
            ) {
              this.statusTimer =
                setTimeout(
                  checkStatus,
                  1500
                );
            } else {

              this.stopPolling();

              this.loadCampaigns();
            }
          },

          error: (error) => {

            console.error(
              'Campaign status error:',
              error
            );

            this.stopPolling();
          }
        });
    };

    checkStatus();
  }

  // --------------------------------------------------
  // STOP POLLING
  // --------------------------------------------------

  stopPolling(): void {

    if (this.statusTimer) {

      clearTimeout(
        this.statusTimer
      );

      this.statusTimer = null;
    }
  }

  // --------------------------------------------------
  // LOAD CAMPAIGN HISTORY
  // --------------------------------------------------

  loadCampaigns(): void {

    this.loadingCampaigns = true;

    this.campaignService
      .getCampaigns()
      .subscribe({

        next: (response: any) => {

          this.loadingCampaigns = false;

          this.campaigns =
            response?.data ||
            response?.campaigns ||
            response ||
            [];
        },

        error: (error) => {

          this.loadingCampaigns = false;

          console.error(
            'Unable to load campaigns',
            error
          );
        }
      });
  }

  // --------------------------------------------------
  // VIEW CAMPAIGN
  // --------------------------------------------------

 viewCampaign(
  campaignId: string
): void {

  this.loadingDetails = true;

  this.recipients = [];
  this.recipientPage = 1;
  this.recipientTotal = 0;
  this.recipientPages = 0;
  this.recipientSearch = '';
  this.recipientStatus = '';

  this.campaignService
    .getCampaign(campaignId)
    .subscribe({

      next: (response: any) => {

        this.loadingDetails = false;

        this.selectedCampaign =
          response?.campaign ||
          response?.data ||
          response;

        if (
          this.selectedCampaign
        ) {

          this.campaignId =
            this.selectedCampaign._id;

          this.campaignStatus =
            this.selectedCampaign.status ||
            'draft';

          this.loadRecipients(
            this.selectedCampaign._id,
            1
          );
        }
      },

      error: (error) => {

        this.loadingDetails = false;

        console.error(
          'Campaign details error:',
          error
        );

        alert(
          error?.error?.message ||
          'Unable to load campaign details.'
        );
      }
    });
}

  // --------------------------------------------------
  // CLOSE DETAILS
  // --------------------------------------------------

  closeDetails(): void {
    this.selectedCampaign = null;
  }

  // --------------------------------------------------
  // STATUS CLASS
  // --------------------------------------------------

  getStatusClass(
    status: string
  ): string {

    switch (
      (status || '').toLowerCase()
    ) {

      case 'completed':
        return 'status-completed';

      case 'processing':
        return 'status-processing';

      case 'failed':
        return 'status-failed';

      case 'draft':
        return 'status-draft';

      default:
        return 'status-draft';
    }
  }

  // --------------------------------------------------
  // NUMBER NAME
  // --------------------------------------------------

  getWhatsappNumberName(
    numberId: any
  ): string {

    const id =
      typeof numberId === 'object'
        ? numberId?._id
        : numberId;

    const number =
      this.whatsappNumbers.find(
        item => item._id === id
      );

    if (number) {

      return `${number.businessName} - ${number.displayNumber}`;
    }

    if (
      typeof numberId === 'object'
    ) {

      return `${numberId.businessName || ''} - ${numberId.displayNumber || ''}`;
    }

    return '-';
  }

  // --------------------------------------------------
  // PROGRESS
  // --------------------------------------------------

  getProgress(
    campaign: any
  ): number {

    if (!campaign?.total) {
      return 0;
    }

    const completed =
      (campaign.sent || 0) +
      (campaign.delivered || 0) +
      (campaign.read || 0) +
      (campaign.failed || 0) +
      (campaign.skipped || 0);

    return Math.min(
      100,
      Math.round(
        (completed /
          campaign.total) *
        100
      )
    );
  }

}