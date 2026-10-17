import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Product } from '../models/product';



import { ProductService } from '../services/product.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  // ==========================================
  // PROJECT ID
  // ==========================================

readonly projectId = 'Ecom-02';
  // ==========================================
  // JOB
  // ==========================================

  job: Product | null = null;

  jobId = '';

  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (!id) {

        this.error = true;

        return;
      }

      this.jobId = id;

      this.getJob(id);
    });
  }

  // ==========================================
  // GET JOB
  // ==========================================

  getJob(id: string): void {

    this.loading = true;

    this.error = false;

    this.job = null;

    this.productService
      .getProductById(
        id,
        this.projectId
      )
      .subscribe({

        next: (job) => {

          this.job = job;

          this.loading = false;
        },

        error: (err) => {

          console.error(
            'Failed to load job:',
            err
          );

          this.error = true;

          this.loading = false;
        }

      });
  }

  // ==========================================
  // CATEGORY
  // ==========================================

  getCategory(): string {

    if (!this.job?.category) {
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

    return categoryMap[
      this.job.category
    ] || this.job.category;
  }

  // ==========================================
  // IMAGE
  // ==========================================

getJobImage(): string {

  if (!this.job) {
    return 'assets/images/no-image.png';
  }

  if (this.job.photo) {
    return this.getFileUrl(this.job.photo);
  }

  return 'assets/images/no-image.png';
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

  getPrice(): number {

    return Number(
      this.job?.basePrice || 0
    );
  }

  // ==========================================
  // DISCOUNT PRICE
  // ==========================================

  getDiscountPrice(): number {

    if (!this.job) {
      return 0;
    }

    if (
      this.job.discountedPrice !== undefined &&
      this.job.discountedPrice !== null
    ) {

      return Number(
        this.job.discountedPrice
      );
    }

    const price =
      Number(this.job.basePrice || 0);

    const discount =
      Number(
        this.job.discountPercent || 0
      );

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

  hasDiscount(): boolean {

    return Number(
      this.job?.discountPercent || 0
    ) > 0;
  }

  // ==========================================
  // AVAILABILITY
  // ==========================================

  isAvailable(): boolean {

    return this.job?.inStock !== false;
  }

  getAvailabilityText(): string {

    if (!this.job) {
      return '';
    }

    if (this.job.inStock === false) {
      return 'Position Closed';
    }

    return 'Position Available';
  }

  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/tech/jobs'
    ]);
  }

  // ==========================================
  // RETRY
  // ==========================================

  retry(): void {

    if (this.jobId) {

      this.getJob(
        this.jobId
      );
    }
  }
}