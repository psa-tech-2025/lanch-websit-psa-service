import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../models/product';



import { ProductService } from '../services/product.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-psa-job',
  templateUrl: './psa-job.component.html',
  styleUrls: ['./psa-job.component.css']
})
export class PsaJobComponent implements OnInit {

  // ==========================================
  // PROJECT ID
  // ==========================================

  private readonly PROJECT_ID = 'Ecom-02';

  // ==========================================
  // JOB DATA
  // ==========================================

  allProducts: Product[] = [];
  products: Product[] = [];

  loading = false;
  error = false;

  // ==========================================
  // JOB CATEGORIES
  // Exact categories from reference
  // ==========================================

  jobCategories = [
    { value: 'private', label: 'Private Jobs' },
    { value: 'government', label: 'Government Jobs' },
    { value: 'internship', label: 'Internships' },
    { value: 'placement', label: 'Placement Drive' },
    { value: 'freelance', label: 'Freelance Jobs' },
    { value: 'remote', label: 'Remote Jobs' },
    { value: 'workfromhome', label: 'Work From Home' },
    { value: 'walkin', label: 'Walk-In Drive' },
    { value: 'freshers', label: 'Freshers Jobs' },
    { value: 'experienced', label: 'Experienced Jobs' },
    { value: 'itjobs', label: 'IT Jobs' },
    { value: 'software', label: 'Software Jobs' },
    { value: 'aijobs', label: 'AI / ML Jobs' },
    { value: 'datascience', label: 'Data Science Jobs' },
    { value: 'cybersecurity', label: 'Cyber Security Jobs' },
    { value: 'sales', label: 'Sales Jobs' },
    { value: 'marketingjobs', label: 'Marketing Jobs' },
    { value: 'financejobs', label: 'Finance Jobs' },
    { value: 'hrjobs', label: 'HR Jobs' },
    { value: 'engineering', label: 'Engineering Jobs' },
    { value: 'healthcare', label: 'Healthcare Jobs' },
    { value: 'education', label: 'Education Jobs' },
    { value: 'banking', label: 'Banking Jobs' }
  ];

  selectedCategory: string = 'all';
  searchText: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {
    this.fetchJobs();
  }

  // ==========================================
  // FETCH JOBS
  // ==========================================

  fetchJobs(): void {

    this.loading = true;
    this.error = false;

    this.productService
      .getAllProducts(this.PROJECT_ID)
      .subscribe({

        next: (products) => {

          this.allProducts = products || [];

          this.filterJobs();

          this.loading = false;
        },

        error: (err) => {

          console.error(
            'Failed to load jobs:',
            err
          );

          this.error = true;
          this.loading = false;
        }

      });
  }

  // ==========================================
  // FILTER JOBS
  // ==========================================

  filterJobs(): void {

    // Exact valid job category values
    const jobValues =
      this.jobCategories.map(
        category => category.value
      );

    // Only job products
    let list =
      this.allProducts.filter(job =>
        jobValues.includes(job.category || '')
      );

    // Selected category
    if (this.selectedCategory !== 'all') {

      list =
        list.filter(job =>
          job.category === this.selectedCategory
        );
    }

    // Search
    const query =
      this.searchText.trim().toLowerCase();

    if (query) {

      list = list.filter(job =>

        (job.name || '')
          .toLowerCase()
          .includes(query)

        ||

        (job.code || '')
          .toLowerCase()
          .includes(query)

        ||

        (job.description || '')
          .toLowerCase()
          .includes(query)
      );
    }

    this.products = list;
  }

  // ==========================================
  // CATEGORY DISPLAY NAME
  // ==========================================

  prettyCategory(
    category?: string | null
  ): string {

    if (!category) {
      return '';
    }

    const categoryMap: {
      [key: string]: string
    } = {

      private:
        'Private Jobs',

      government:
        'Government Jobs',

      internship:
        'Internships',

      placement:
        'Placement Drive',

      freelance:
        'Freelance Jobs',

      remote:
        'Remote Jobs',

      workfromhome:
        'Work From Home',

      walkin:
        'Walk-In Drive',

      freshers:
        'Freshers Jobs',

      experienced:
        'Experienced Jobs',

      itjobs:
        'IT Jobs',

      software:
        'Software Jobs',

      aijobs:
        'AI / ML Jobs',

      datascience:
        'Data Science Jobs',

      cybersecurity:
        'Cyber Security Jobs',

      sales:
        'Sales Jobs',

      marketingjobs:
        'Marketing Jobs',

      financejobs:
        'Finance Jobs',

      hrjobs:
        'HR Jobs',

      engineering:
        'Engineering Jobs',

      healthcare:
        'Healthcare Jobs',

      education:
        'Education Jobs',

      banking:
        'Banking Jobs'
    };

    return categoryMap[category] || category;
  }

  // ==========================================
  // JOB IMAGE
  // ==========================================

  getJobImage(job: Product): string {

    if (!job) {
      return '';
    }

    if (job.photo) {
      return this.getFileUrl(job.photo);
    }

    const j = job as any;

    if (j.image) {
      return this.getFileUrl(j.image);
    }

    return '';
  }

  // ==========================================
  // FILE URL
  // ==========================================

getFileUrl(path?: string): string {
  if (!path) {
    return '';
  }

  if (
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }

  const cleanPath = path.replace(/^\/uploads/, '');

  return `${environment.uploadUrl}${cleanPath}`;
}

  // ==========================================
  // IMAGE ERROR
  // ==========================================

  onImageError(event: Event): void {

    const img =
      event.target as HTMLImageElement;

    if (img) {

      img.src =
        'assets/images/no-image.png';
    }
  }

  // ==========================================
  // PRICE
  // ==========================================

  getPrice(job: Product): number {

    return Number(
      job?.basePrice || 0
    );
  }

  // ==========================================
  // DISCOUNT PRICE
  // ==========================================

  getDiscountPrice(job: Product): number {

    if (!job) {
      return 0;
    }

    if (
      job.discountedPrice !== undefined &&
      job.discountedPrice !== null
    ) {
      return Number(
        job.discountedPrice
      );
    }

    const price =
      Number(job.basePrice || 0);

    const discount =
      Number(job.discountPercent || 0);

    if (discount <= 0) {
      return price;
    }

    return Number(
      (
        price -
        (price * discount / 100)
      ).toFixed(2)
    );
  }

  // ==========================================
  // DISCOUNT
  // ==========================================

  hasDiscount(job: Product): boolean {

    return Number(
      job?.discountPercent || 0
    ) > 0;
  }

  // ==========================================
  // AVAILABILITY
  // ==========================================

  isAvailable(job: Product): boolean {

    return job?.inStock !== false;
  }

  getAvailabilityText(job: Product): string {

    if (!job) {
      return '';
    }

    if (job.inStock === false) {
      return 'Position Closed';
    }

    return 'Position Available';
  }

  // ==========================================
  // VIEW DETAILS
  // ==========================================

  viewDetails(job: Product): void {

    const id =
      job._id ||
      (job as any).id ||
      (job as any).productId;

    if (!id) {

      console.error(
        'Job ID not found',
        job
      );

      return;
    }

    this.router.navigate([
      '/tech/jobs',
      id
    ]);
  }

  // ==========================================
  // TRACK BY
  // ==========================================

  trackByJob(
    index: number,
    job: Product
  ): string | number {

    return job._id || index;
  }

  // ==========================================
  // RESET
  // ==========================================

  resetFilters(): void {

    this.selectedCategory = 'all';
    this.searchText = '';

    this.filterJobs();
  }

  // ==========================================
  // RETRY
  // ==========================================

  retry(): void {
    this.fetchJobs();
  }
}