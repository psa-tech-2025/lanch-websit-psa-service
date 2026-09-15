import { Component, OnInit } from '@angular/core';
import { WhatsappCampaignService } from '../services/whatsapp-campaign.service';

@Component({
  selector: 'app-whatsapp-number',
  templateUrl: './whatsapp-number.component.html',
  styleUrls: ['./whatsapp-number.component.css']
})
export class WhatsappNumberComponent implements OnInit {

  numbers: any[] = [];

  showForm = false;
  loading = false;
  saving = false;

  form = {
    displayNumber: '',
    businessName: '',
    phoneNumberId: '',
    businessAccountId: ''
  };

  constructor(
    private whatsappService: WhatsappCampaignService
  ) {}

  ngOnInit(): void {
    this.loadNumbers();
  }

  loadNumbers(): void {
    this.loading = true;

    this.whatsappService.getWhatsappNumbers().subscribe({
      next: (response: any) => {
        this.loading = false;

        this.numbers =
          response?.data ||
          response?.numbers ||
          response ||
          [];
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        alert(
          error?.error?.message ||
          'Unable to load WhatsApp numbers.'
        );
      }
    });
  }

  openAddForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;

    this.form = {
      displayNumber: '',
      businessName: '',
      phoneNumberId: '',
      businessAccountId: ''
    };
  }

  connectNumber(): void {

    if (!this.form.displayNumber.trim()) {
      alert('Please enter WhatsApp number.');
      return;
    }

    if (!this.form.businessName.trim()) {
      alert('Please enter business name.');
      return;
    }

    if (!this.form.phoneNumberId.trim()) {
      alert('Please enter Phone Number ID.');
      return;
    }

    if (!this.form.businessAccountId.trim()) {
      alert('Please enter Business Account ID.');
      return;
    }

    this.saving = true;

    this.whatsappService
      .connectWhatsappNumber(this.form)
      .subscribe({

        next: () => {

          this.saving = false;

          alert(
            'WhatsApp number connected successfully.'
          );

          this.closeForm();
          this.loadNumbers();
        },

        error: (error) => {

          this.saving = false;

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to connect WhatsApp number.'
          );
        }
      });
  }

  removeNumber(id: string): void {

    if (
      !confirm(
        'Are you sure you want to remove this WhatsApp number?'
      )
    ) {
      return;
    }

    this.whatsappService
      .removeWhatsappNumber(id)
      .subscribe({

        next: () => {

          alert('WhatsApp number removed successfully.');

          this.loadNumbers();
        },

        error: (error) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to remove WhatsApp number.'
          );
        }
      });
  }
}