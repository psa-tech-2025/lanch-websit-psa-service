import { Component, OnInit } from '@angular/core';
import { WhatsappCampaignService } from '../services/whatsapp-campaign.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  templates: any[] = [];

  showForm = false;
  loading = false;
  saving = false;

  form = {
    name: '',
    language: 'en_US',
    category: 'UTILITY',
    body: ''
  };

  constructor(
    private whatsappService: WhatsappCampaignService
  ) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {

    this.loading = true;

    this.whatsappService.getTemplates().subscribe({

      next: (response: any) => {

        this.loading = false;

        this.templates =
          response?.data ||
          response?.templates ||
          response ||
          [];
      },

      error: (error) => {

        this.loading = false;

        console.error(error);

        alert(
          error?.error?.message ||
          'Unable to load templates.'
        );
      }
    });
  }

  createTemplate(): void {

    if (!this.form.name.trim()) {
      alert('Please enter template name.');
      return;
    }

    if (!this.form.body.trim()) {
      alert('Please enter template message.');
      return;
    }

    this.saving = true;

    this.whatsappService
      .createTemplate(this.form)
      .subscribe({

        next: () => {

          this.saving = false;

          alert('Template created successfully.');

          this.closeForm();

          this.loadTemplates();
        },

        error: (error) => {

          this.saving = false;

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to create template.'
          );
        }
      });
  }

  deleteTemplate(id: string): void {

    if (!confirm('Delete this template?')) {
      return;
    }

    this.whatsappService
      .deleteTemplate(id)
      .subscribe({

        next: () => {

          alert('Template deleted.');

          this.loadTemplates();
        },

        error: (error) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to delete template.'
          );
        }
      });
  }

  closeForm(): void {

    this.showForm = false;

    this.form = {
      name: '',
      language: 'en_US',
      category: 'UTILITY',
      body: ''
    };
  }
}