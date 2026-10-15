
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { LiveCourse } from '../models/live-course';
import { LiveCourseService } from '../live/services/live-course.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  private readonly PROJECT_ID = 'Ecom-02';

  // COURSE LIST
  allCourses: LiveCourse[] = [];
  courses: LiveCourse[] = [];

  loading = false;
  error = false;

  // CATEGORY + SEARCH
  categories = [
    { value: 'commerce', label: 'Commerce & Finance' },
    { value: 'technology', label: 'IT & Technology' },
    { value: 'programming', label: 'Programming' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'english', label: 'Spoken English' },
    { value: 'personality', label: 'Personality Development' },
    { value: 'wellness', label: 'Health & Wellness' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'design', label: 'Graphic & UI Design' },
    { value: 'creative', label: 'Creative Arts' },
    { value: 'kids', label: 'Kids Learning' },
    { value: 'training', label: 'Professional Training' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'webinar', label: 'Live Webinar' },
    { value: 'certificate', label: 'Certification Program' }
  ];

  selectedCategory = 'all';
  searchText = '';

  constructor(
    private liveCourseService: LiveCourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  // ==========================================
  // FETCH ALL COURSES
  // ==========================================

  fetchCourses(): void {
    this.loading = true;
    this.error = false;

this.liveCourseService
  .getAllProducts(this.PROJECT_ID)
  .subscribe({
    next: (response: LiveCourse[]) => {
      this.allCourses = response || [];
      this.filterCourses();
      this.loading = false;
    },
    error: (err) => {
      console.error('Failed to load courses:', err);
      this.error = true;
      this.loading = false;
    }
  });
  }

  // ==========================================
  // FILTER + SEARCH
  // ==========================================

  filterCourses(): void {
    const courseCategories =
      this.categories.map(category => category.value);

    let list = this.allCourses.filter(course =>
      courseCategories.includes(course.category || '')
    );

    if (this.selectedCategory !== 'all') {
      list = list.filter(course =>
        course.category === this.selectedCategory
      );
    }

    const query = this.searchText.trim().toLowerCase();

    if (query) {
      list = list.filter(course =>
        (course.name || '').toLowerCase().includes(query) ||
        ((course as any).code || '').toLowerCase().includes(query) ||
        (course.description || '').toLowerCase().includes(query)
      );
    }

    this.courses = list;
  }

  // ==========================================
  // CATEGORY LABEL
  // ==========================================

  prettyCategory(category?: string | null): string {
    if (!category) {
      return '';
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
  // COURSE IMAGE
  // ==========================================

  getCourseImage(course: LiveCourse): string {
    const imagePath =
      (course as any).photo ||
      course.image ||
      (course as any).thumbnail;

    if (!imagePath) {
      return 'assets/images/no-image.png';
    }

    return this.getFileUrl(imagePath);
  }

  // ==========================================
  // FILE URL
  // ==========================================

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

  // ==========================================
  // IMAGE ERROR
  // ==========================================

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    if (img) {
      img.onerror = null;
      img.src = 'assets/images/no-image.png';
    }
  }

  // ==========================================
  // PRICE
  // ==========================================

  getPrice(course: LiveCourse): number {
    return Number(
      (course as any).basePrice ??
      course.price ??
      0
    );
  }

  // ==========================================
  // DISCOUNT PRICE
  // ==========================================

  getDiscountPrice(course: LiveCourse): number {
    const discountedPrice = (course as any).discountedPrice;

    if (discountedPrice !== undefined && discountedPrice !== null) {
      return Number(discountedPrice);
    }

    const price = this.getPrice(course);
    const discount = Number((course as any).discountPercent || 0);

    if (discount <= 0) {
      return price;
    }

    return Number(
      (price - (price * discount / 100)).toFixed(2)
    );
  }

  // ==========================================
  // DISCOUNT CHECK
  // ==========================================

  hasDiscount(course: LiveCourse): boolean {
    return Number((course as any).discountPercent || 0) > 0;
  }

  // ==========================================
  // AVAILABILITY
  // ==========================================

  isInStock(course: LiveCourse): boolean {
    return (course as any).inStock !== false;
  }

  getStockText(course: LiveCourse): string {
    return this.isInStock(course) ? 'Available' : 'Not Available';
  }

  // ==========================================
  // OPEN SELECTED COURSE DETAILS
  // ==========================================

  viewDetails(course: LiveCourse): void {
    const id =
      course._id ||
      (course as any).id ||
      (course as any).courseId;

    if (!id) {
      console.error('Course ID not found:', course);
      return;
    }

    this.router.navigate(['/live/courses', id]);
  }

  // ==========================================
  // TRACK BY
  // ==========================================

  trackByCourse(index: number, course: LiveCourse): string | number {
    return course._id || (course as any).id || index;
  }

  // ==========================================
  // RESET FILTER
  // ==========================================

  resetFilters(): void {
    this.selectedCategory = 'all';
    this.searchText = '';
    this.filterCourses();
  }

  // ==========================================
  // RETRY
  // ==========================================

  retry(): void {
    this.fetchCourses();
  }
}
