import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LiveCourse } from '../models/live-course';
import { LiveCourseService } from '../live/services/live-course.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private readonly PROJECT_ID = 'Ecom-02';

  course: LiveCourse | null = null;

  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private liveCourseService: LiveCourseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.error = true;
        this.loading = false;
        return;
      }

      this.fetchCourseDetails(id);
    });
  }

  // ==========================================
  // FETCH SELECTED COURSE
  // ==========================================

  fetchCourseDetails(id: string): void {
    this.loading = true;
    this.error = false;
    this.course = null;

    this.liveCourseService
      .getProductById(id, this.PROJECT_ID)
      .subscribe({
        next: (response: LiveCourse) => {
          this.course = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load course details:', err);
          this.error = true;
          this.loading = false;
        }
      });
  }

  // ==========================================
  // COURSE TITLE
  // ==========================================

  getCourseTitle(): string {
    if (!this.course) {
      return 'Course Details';
    }

    return this.course.name || this.course.title || 'Course Details';
  }

  // ==========================================
  // COURSE IMAGE
  // ==========================================

  getCourseImage(): string {
    if (!this.course) {
      return 'assets/images/no-image.png';
    }

    const imagePath =
      (this.course as any).photo ||
      this.course.image ||
      (this.course as any).thumbnail;

    if (!imagePath) {
      return 'assets/images/no-image.png';
    }

    return this.getFileUrl(imagePath);
  }

  getFileUrl(path?: string): string {
    if (!path) {
      return 'assets/images/no-image.png';
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

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    if (img) {
      img.onerror = null;
      img.src = 'assets/images/no-image.png';
    }
  }

  // ==========================================
  // CATEGORY
  // ==========================================

  getCategoryLabel(): string {
    const category = this.course?.category;

    if (!category) {
      return 'Live Course';
    }

    const categoryMap: { [key: string]: string } = {
      commerce: 'Commerce & Finance',
      technology: 'IT & Technology',
      programming: 'Programming',
      ai: 'Artificial Intelligence',
      english: 'Spoken English',
      personality: 'Personality Development',
      wellness: 'Health & Wellness',
      marketing: 'Digital Marketing',
      design: 'Graphic & UI Design',
      creative: 'Creative Arts',
      kids: 'Kids Learning',
      training: 'Professional Training',
      workshop: 'Workshop',
      webinar: 'Live Webinar',
      certificate: 'Certification Program'
    };

    return categoryMap[category] || category;
  }

  // ==========================================
  // PRICE
  // ==========================================

  getPrice(): number {
    if (!this.course) {
      return 0;
    }

    return Number(
      (this.course as any).basePrice ??
      this.course.price ??
      0
    );
  }

  getDiscountPrice(): number {
    if (!this.course) {
      return 0;
    }

    const discountedPrice = (this.course as any).discountedPrice;

    if (
      discountedPrice !== undefined &&
      discountedPrice !== null
    ) {
      return Number(discountedPrice);
    }

    const price = this.getPrice();
    const discount = Number(
      (this.course as any).discountPercent || 0
    );

    if (discount <= 0) {
      return price;
    }

    return Number(
      (price - (price * discount / 100)).toFixed(2)
    );
  }

  hasDiscount(): boolean {
    return !!this.course &&
      Number((this.course as any).discountPercent || 0) > 0;
  }

  getDiscountPercent(): number {
    return Number((this.course as any)?.discountPercent || 0);
  }

  // ==========================================
  // COURSE INFORMATION
  // ==========================================

  getDescription(): string {
    return this.course?.description || 'No description available.';
  }

  getDuration(): string {
    if (!this.course) {
      return '';
    }

    const course = this.course as any;

    return course.duration ||
      course.courseDuration ||
      course.totalDuration ||
      '';
  }

  getInstructor(): string {
    if (!this.course) {
      return '';
    }

    const course = this.course as any;

    return course.instructorName ||
      course.instructor ||
      course.trainerName ||
      '';
  }

  getCourseCode(): string {
    if (!this.course) {
      return '';
    }

    const course = this.course as any;

    return course.code ||
      course.courseCode ||
      '';
  }

  // ==========================================
  // AVAILABILITY
  // ==========================================

  isInStock(): boolean {
    return (this.course as any)?.inStock !== false;
  }

  getStockText(): string {
    return this.isInStock() ? 'Available' : 'Not Available';
  }

  // ==========================================
  // NAVIGATION
  // ==========================================

  goBack(): void {
    this.router.navigate(['/live/courses']);
  }

  retry(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.fetchCourseDetails(id);
    } else {
      this.error = true;
    }
  }
}