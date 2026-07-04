import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadApiService } from 'src/app/auth/api/lead-api.service';
import { ContactService } from 'src/app/auth/contact.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit {
    contactForm!: FormGroup;
  selectedDocument: File | null = null;
  selectedPhoto: File | null = null;
  isUploading = false;
  contactInfo: any
username = '';
mobile = '';

projectId = 'Ecom-01';

loading = false;



  constructor(private fb: FormBuilder, private contactService:ContactService,
    private leadApiService: LeadApiService
  ) { }

  allowOnlyNumbers(event: KeyboardEvent) {

  const charCode = event.which
    ? event.which
    : event.keyCode;

  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }

}

isValidMobile(): boolean {

  return /^[6-9]\d{9}$/.test(this.mobile);

}

saveLead(): void {

  const name = this.username?.trim();
  const mobile = this.mobile?.trim();

  if (!name) {

    alert('Please enter Full Name');
    return;

  }

  if (!mobile) {

    alert('Please enter WhatsApp Number');
    return;

  }

  const mobileRegex = /^[6-9]\d{9}$/;

  if (!mobileRegex.test(mobile)) {

    alert('Please enter valid 10-digit WhatsApp Number');
    return;

  }

  if (this.loading) {
    return;
  }

  this.loading = true;

  this.leadApiService
    .captureLead(
      {
        username: name,
        mobile: mobile
      },
      this.projectId
    )
    .subscribe({

next: (res) => {

  this.loading = false;

  console.log('Lead Saved', res);

  this.username = '';
  this.mobile = '';

  const modal = new bootstrap.Modal(
    document.getElementById('leadSuccessModal')!
  );

  modal.show();

},

      error: (err) => {

        this.loading = false;

        console.error(err);

        alert(
          err?.error?.message ||
          'Unable to save lead'
        );

      }

    });

}



    async ngOnInit() {
    // Initialize contact form
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Fetch admin contact info for display
    try {
      //  this.contactInfo = await this.contactService.getAdminContactInfo();
    } catch (error) {
      console.error('Failed to load admin contact info:', error);
    }
  }

    /** 📁 Handle file selection for document/photo */
  onFileSelect(event: any, type: 'document' | 'photo') {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'document') this.selectedDocument = file;
    if (type === 'photo') this.selectedPhoto = file;
  }
    /** 🚀 Handle contact form submission */
  async onSubmit() {
    if (this.contactForm.invalid) {
      alert('कृपया सर्व आवश्यक माहिती भरा!');
      return;
    }

    this.isUploading = true;
    const contactData = this.contactForm.value;
    const uploadResults: any = {};

    try {
      console.log('📤 Upload started...');

      // ✅ Upload document → financedemo/contact/documents/
      if (this.selectedDocument) {
        uploadResults.documentUrl = await this.contactService.uploadFile('documents', this.selectedDocument);
        console.log('✅ Document uploaded:', uploadResults.documentUrl);
      }

      // ✅ Upload photo → financedemo/contact/photos/
      if (this.selectedPhoto) {
        uploadResults.photoUrl = await this.contactService.uploadFile('photos', this.selectedPhoto);
        console.log('✅ Photo uploaded:', uploadResults.photoUrl);
      }

      // ✅ Merge data and save to Firestore collection: financedemo_contacts
      const finalData = { ...contactData, ...uploadResults, date: new Date() };
      await this.contactService.saveContactData(finalData);
      console.log('✅ Data saved to Firestore:', finalData);

      alert('संदेश यशस्वीपणे पाठवला गेला!');
      this.contactForm.reset();
      this.selectedDocument = null;
      this.selectedPhoto = null;
    } catch (err) {
      console.error('❌ Upload/Save Error:', err);
      alert('त्रुटी आली आहे. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      this.isUploading = false;
    }
  }

  }


  


