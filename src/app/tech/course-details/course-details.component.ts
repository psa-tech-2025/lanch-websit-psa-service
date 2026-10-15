import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  // ==========================================
  // PROJECT
  // ==========================================

  private readonly PROJECT_ID = 'Ecom-02';

  // ==========================================
  // COURSE
  // ==========================================

  course: Product | null = null;

  loading = false;
  error = false;

  courseId = '';

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

      this.courseId = id;

      this.getCourse(id);
    });
  }

  // ==========================================
  // GET COURSE
  // ==========================================

  getCourse(id: string): void {

    this.loading = true;
    this.error = false;
    this.course = null;

    this.productService
      .getProductById(
        id,
        this.PROJECT_ID
      )
      .subscribe({

        next: (course) => {

          this.course = course;

          this.loading = false;
        },

        error: (err) => {

          console.error(
            'Failed to load course:',
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

    if (!this.course?.category) {
      return '';
    }

    const categoryMap: {
      [key: string]: string
    } = {

      commerce:
        'Commerce & Finance',

      technology:
        'IT & Technology',

      programming:
        'Programming',

      ai:
        'Artificial Intelligence',

      english:
        'Spoken English',

      personality:
        'Personality Development',

      wellness:
        'Health & Wellness',

      marketing:
        'Digital Marketing',

      design:
        'Graphic & UI Design',

      creative:
        'Creative Arts',

      kids:
        'Kids Learning',

      training:
        'Professional Training',

      workshop:
        'Workshop',

      webinar:
        'Live Webinar',

      certificate:
        'Certification Program'
    };

    return categoryMap[
      this.course.category
    ] || this.course.category;
  }

  // ==========================================
  // IMAGE
  // ==========================================

getCourseImage(): string {

  if (!this.course) {
    return 'assets/images/no-image.png';
  }

  if (this.course.photo) {
    return this.getFileUrl(this.course.photo);
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
      this.course?.basePrice || 0
    );
  }

  // ==========================================
  // DISCOUNT PRICE
  // ==========================================

  getDiscountPrice(): number {

    if (!this.course) {
      return 0;
    }

    if (
      this.course.discountedPrice !== undefined &&
      this.course.discountedPrice !== null
    ) {
      return Number(
        this.course.discountedPrice
      );
    }

    const price =
      Number(this.course.basePrice || 0);

    const discount =
      Number(
        this.course.discountPercent || 0
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
      this.course?.discountPercent || 0
    ) > 0;
  }

  // ==========================================
  // STOCK
  // ==========================================

  isInStock(): boolean {

    return this.course?.inStock !== false;
  }

  getStockText(): string {

    if (!this.course) {
      return '';
    }

    if (this.course.inStock === false) {
      return 'Not Available';
    }

    return 'Available';
  }

  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/tech/courses'
    ]);
  }

  // ==========================================
  // RETRY
  // ==========================================

  retry(): void {

    if (this.courseId) {

      this.getCourse(
        this.courseId
      );
    }
  }
}