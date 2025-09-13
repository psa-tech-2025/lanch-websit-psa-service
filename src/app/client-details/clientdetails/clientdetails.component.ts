import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit {

   careerForm!: FormGroup;

  SALUTATIONS = ['Mr.', 'Ms.', 'Dr.', 'Prof.'];
  INDUSTRIES = ['IT', 'Healthcare', 'Finance', 'Education', 'Retail'];
  JOB_ROLES = ['Developer', 'Manager', 'Analyst', 'Sales'];
  CONTACT_TYPES = ['Client', 'Partner', 'Employee'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.careerForm = this.fb.group({
  type: [''],
  mobile: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  passwordHash: ['', Validators.required],
  salutation: [''],
  firstName: [''],
  lastName: [''],
  companyName: [''],
  jobTitle: [''],
  industry: [''],
  jobRole: [''],
  countryCode: [''],
  postalCode: [''],
  city: [''],
  countryRegion: [''],
  contactType: [''],
  marketingConsent: [false]
});
  }

  onSubmit(): void {
    if (this.careerForm.valid) {
      console.log('Form Submitted', this.careerForm.value);
      // send to backend
    } else {
      this.careerForm.markAllAsTouched();
    }
  }

}
