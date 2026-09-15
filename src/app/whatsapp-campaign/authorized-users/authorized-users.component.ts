import { Component, OnInit } from '@angular/core';
import { WhatsappCampaignService } from '../services/whatsapp-campaign.service';

@Component({
  selector: 'app-authorized-users',
  templateUrl: './authorized-users.component.html',
  styleUrls: ['./authorized-users.component.css']
})
export class AuthorizedUsersComponent implements OnInit {

  numbers: any[] = [];
  users: any[] = [];

  selectedNumberId = '';

  loadingNumbers = false;
  loadingUsers = false;
  saving = false;

  form = {
    userId: '',
    name: '',
    email: '',
    role: 'CAMPAIGN_MANAGER'
  };

  constructor(
    private whatsappService: WhatsappCampaignService
  ) {}

  ngOnInit(): void {
    this.loadNumbers();
  }

  loadNumbers(): void {

    this.loadingNumbers = true;

    this.whatsappService.getWhatsappNumbers().subscribe({

      next: (response: any) => {

        this.loadingNumbers = false;

        this.numbers =
          response?.data ||
          response?.numbers ||
          response ||
          [];

        if (this.numbers.length > 0) {
          this.selectedNumberId = this.numbers[0]._id;
          this.loadUsers();
        }
      },

      error: (error) => {

        this.loadingNumbers = false;

        console.error(error);

        alert(
          error?.error?.message ||
          'Unable to load WhatsApp numbers.'
        );
      }
    });
  }

  onNumberChange(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    if (!this.selectedNumberId) {
      this.users = [];
      return;
    }

    this.loadingUsers = true;

    this.whatsappService
      .getAuthorizedUsers(this.selectedNumberId)
      .subscribe({

        next: (response: any) => {

          this.loadingUsers = false;

          this.users =
            response?.data ||
            response?.users ||
            response ||
            [];
        },

        error: (error) => {

          this.loadingUsers = false;

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to load authorized users.'
          );
        }
      });
  }

  authorizeUser(): void {

    if (!this.selectedNumberId) {
      alert('Please select WhatsApp number.');
      return;
    }

    if (!this.form.email.trim()) {
      alert('Please enter user email.');
      return;
    }

    this.saving = true;

    this.whatsappService
      .authorizeUser(
        this.selectedNumberId,
        this.form
      )
      .subscribe({

        next: () => {

          this.saving = false;

          alert(
            'User authorized successfully.'
          );

          this.form = {
            userId: '',
              name: '',
            email: '',
            role: 'CAMPAIGN_MANAGER'
          };

          this.loadUsers();
        },

        error: (error) => {

          this.saving = false;

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to authorize user.'
          );
        }
      });
  }

  removeUser(userId: string): void {

    if (
      !confirm(
        'Are you sure you want to remove this authorized user?'
      )
    ) {
      return;
    }

    this.whatsappService
      .removeAuthorizedUser(
        this.selectedNumberId,
        userId
      )
      .subscribe({

        next: () => {

          alert(
            'Authorized user removed.'
          );

          this.loadUsers();
        },

        error: (error) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to remove authorized user.'
          );
        }
      });
  }
}