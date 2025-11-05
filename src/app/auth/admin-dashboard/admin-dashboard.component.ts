import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../contact.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
   headerForm!: FormGroup;
  adminContactForm!: FormGroup;
  logoFile: File | null = null;
  selectedLogoPreview: string | null = null;
  message = '';
  isAdmin = false;
  contacts: any[] = [];
  loading = true;

  constructor(
      private fb: FormBuilder,
    private contactService: ContactService,
      private auth: AuthService
  ) { }

  async ngOnInit() {
  this.loading = true;
  try {
    this.isAdmin = this.auth.isLoggedIn(); // make sure this returns true for your admin
    if (this.isAdmin) {
      this.contacts = await this.contactService.getAllContacts();
    }
  } catch (e) {
    console.error('Failed to load contacts:', e);
  } finally {
    this.loading = false; // ✅ ensure UI can render
  }
}
}