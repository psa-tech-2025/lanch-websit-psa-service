import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';



import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-psa-course',
  templateUrl: './psa-course.component.html',
  styleUrls: ['./psa-course.component.css']
})
export class PsaCourseComponent implements OnInit {

  // ==========================================
  // PROJECT
  // ==========================================
  private readonly PROJECT_ID = 'Ecom-02';

  // ==========================================
  // PRODUCTS FROM API
  // ==========================================
  allProducts: Product[] = [];
  products: Product[] = [];

  loading = false;
  error = false;

  // ==========================================
  // CATEGORY + SEARCH
  // ==========================================

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
    this.fetchCourses();
  }

  // ==========================================
  // FETCH COURSES
  // ==========================================

  fetchCourses(): void {

    this.loading = true;
    this.error = false;

    this.productService
      .getAllProducts(this.PROJECT_ID)
      .subscribe({

        next: (products) => {

          this.allProducts = products || [];

          this.filterCourses();

          this.loading = false;
        },

        error: (err) => {

          console.error(
            'Failed to load courses:',
            err
          );

          this.error = true;
          this.loading = false;
        }

      });
  }

  // ==========================================
  // FILTER COURSES
  // ==========================================

  filterCourses(): void {

    // Course category values
    const courseValues =
      this.categories.map(category => category.value);

    // Only courses
    let list = this.allProducts.filter(course =>
      courseValues.includes(course.category || '')
    );

    // Category filter
    if (this.selectedCategory !== 'all') {

      list = list.filter(course =>
        course.category === this.selectedCategory
      );
    }

    // Search
    const query =
      this.searchText.trim().toLowerCase();

    if (query) {

      list = list.filter(course =>

        (course.name || '')
          .toLowerCase()
          .includes(query)

        ||

        (course.code || '')
          .toLowerCase()
          .includes(query)

        ||

        (course.description || '')
          .toLowerCase()
          .includes(query)
      );
    }

    this.products = list;
  }

  // ==========================================
  // CATEGORY NAME
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

    return categoryMap[category] || category;
  }

  // ==========================================
  // IMAGE
  // ==========================================

  getCourseImage(course: Product): string {

    if (!course) {
      return '';
    }

    if (course.photo) {
      return this.getFileUrl(course.photo);
    }

    const c = course as any;

    if (c.image) {
      return this.getFileUrl(c.image);
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

  getPrice(course: Product): number {

    return Number(course?.basePrice || 0);
  }

  // ==========================================
  // DISCOUNT PRICE
  // ==========================================

  getDiscountPrice(course: Product): number {

    if (!course) {
      return 0;
    }

    if (
      course.discountedPrice !== undefined &&
      course.discountedPrice !== null
    ) {
      return Number(course.discountedPrice);
    }

    const price =
      Number(course.basePrice || 0);

    const discount =
      Number(course.discountPercent || 0);

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
  // DISCOUNT CHECK
  // ==========================================

  hasDiscount(course: Product): boolean {

    return Number(
      course?.discountPercent || 0
    ) > 0;
  }

  // ==========================================
  // STOCK
  // ==========================================

  isInStock(course: Product): boolean {

    return course?.inStock !== false;
  }

  getStockText(course: Product): string {

    if (!course) {
      return '';
    }

    if (course.inStock === false) {
      return 'Not Available';
    }

    return 'Available';
  }

  // ==========================================
  // VIEW DETAILS
  // ==========================================

  viewDetails(course: Product): void {

    const id =
      course._id ||
      (course as any).id ||
      (course as any).productId;

    if (!id) {
      console.error(
        'Course ID not found',
        course
      );

      return;
    }

    this.router.navigate([
      '/tech/courses',
      id
    ]);
  }

  // ==========================================
  // TRACK BY
  // ==========================================

  trackByCourse(
    index: number,
    course: Product
  ): string | number {

    return course._id || index;
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