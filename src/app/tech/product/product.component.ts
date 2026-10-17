
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 readonly projectId = 'Ecom-02';
  allProducts: any[] = [];
  products: any[] = [];

  loading = false;

  searchText = '';
  selectedCategory = 'all';


  // =========================================================
  // CATEGORIES
  // =========================================================
// ===============================
// PRODUCT CATEGORIES
// ===============================
categories = [
  {
    value: 'landing',
    label: 'Landing Pages'
  },
  {
    value: 'business',
    label: 'Business Websites'
  },
  {
    value: 'ecommerce',
    label: 'E-Commerce Solutions'
  },
  {
    value: 'app',
    label: 'Web & Mobile Apps'
  },
  {
    value: 'seo',
    label: 'SEO & Digital Marketing'
  },
  {
    value: 'consulting',
    label: 'IT Consulting'
  },
  {
    value: 'software',
    label: 'Software Solutions'
  },
  {
    value: 'template',
    label: 'Website Templates'
  },
  {
    value: 'tool',
    label: 'Digital Tools'
  },
  {
    value: 'other',
    label: 'Other Services'
  }
];



  constructor(
    private productService: ProductService,
    private router: Router
  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.fetchProducts();

  }


  // =========================================================
  // FETCH PRODUCTS
  // =========================================================

  fetchProducts(): void {

    this.loading = true;

    this.productService.getAllProducts(this.projectId).subscribe({

      next: (products) => {

        console.log(
          'Products received:',
          products
        );

        this.allProducts = products || [];

        this.filterProducts();

        this.loading = false;

      },

      error: (error) => {

        console.error(
          'Error loading products:',
          error
        );

        this.allProducts = [];

        this.products = [];

        this.loading = false;

      }

    });

  }


  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

filterProducts(): void {

  // Only show products belonging to the above categories
  const productValues = this.categories.map(category => category.value);

  let list = this.allProducts.filter(product =>
    productValues.includes(product.category || '')
  );

  // Category filter
  if (this.selectedCategory !== 'all') {
    list = list.filter(product =>
      product.category === this.selectedCategory
    );
  }

  // Search filter
  const query = this.searchText.trim().toLowerCase();

  if (query) {
    list = list.filter(product =>
      (product.name || '').toLowerCase().includes(query) ||
      (product.code || '').toLowerCase().includes(query) ||
      (product.description || '').toLowerCase().includes(query)
    );
  }

  this.products = list;
}


  // =========================================================
  // SEARCH
  // =========================================================

  searchProducts(): void {

    this.filterProducts();

  }


  // =========================================================
  // RESET FILTERS
  // =========================================================

  resetFilters(): void {

    this.selectedCategory = 'all';

    this.searchText = '';

    this.filterProducts();

  }


  // =========================================================
  // CATEGORY DISPLAY
  // =========================================================

prettyCategory(category?: string | null): string {

  if (!category) {
    return '';
  }

  const categoryMap: { [key: string]: string } = {

    landing: 'Landing Pages',

    business: 'Business Websites',

    ecommerce: 'E-Commerce Solutions',

    app: 'Web & Mobile Apps',

    seo: 'SEO & Digital Marketing',

    consulting: 'IT Consulting',

    software: 'Software Solutions',

    template: 'Website Templates',

    tool: 'Digital Tools',

    other: 'Other Services'
  };

  return categoryMap[category] || category;
}


  // =========================================================
  // GET PRODUCT CATEGORY
  // =========================================================

  getProductCategory(
    product: Product
  ): string {

    const item: any = product;


    const category =
      item.category ||
      item.productCategory ||
      item.type ||
      '';


    return this.prettyCategory(
      category
    );

  }


  // =========================================================
  // GET PRODUCT IMAGE
  // =========================================================

getProductImage(product: Product): string {
  if (!product) {
    return '';
  }

  if (product.photo) {
    return this.getFileUrl(product.photo);
  }

  const p = product as any;

  if (p.image) {
    return this.getFileUrl(p.image);
  }

  return '';
}


  // =========================================================
  // GET FILE URL
  // =========================================================
getFileUrl(path?: string): string {
  if (!path) {
    return '';
  }

  // If API already gives complete URL
  if (
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }

  // Remove /uploads from API path
  const cleanPath = path.replace(/^\/uploads/, '');

  // Use uploadUrl for images/files
  return `${environment.uploadUrl}${cleanPath}`;
}


  // =========================================================
  // IMAGE ERROR
  // =========================================================

  onImageError(
    event: Event
  ): void {

    const image =
      event.target as HTMLImageElement;


    image.src =
      'assets/images/no-image.png';

  }


  // =========================================================
  // VIEW DETAILS
  // =========================================================

  viewDetails(
    product: Product
  ): void {

    if (!product) {

      return;

    }


    const item: any = product;


    const id =
      item._id ||
      item.id ||
      item.code;


    if (!id) {

      console.error(
        'Product ID not found:',
        product
      );

      return;

    }


    this.router.navigate([
      '/tech/product',
      id
    ]);

  }


  // =========================================================
  // TRACK BY
  // =========================================================

  trackByProduct(
    index: number,
    product: Product
  ): string | number {

    const item: any = product;


    return (
      item._id ||
      item.id ||
      item.code ||
      index
    );

  }


  // =========================================================
  // STOCK CHECK
  // =========================================================

  isInStock(
    product: Product
  ): boolean {

    const item: any = product;


    const stock =
      Number(item.stock);


    /*
     * If backend does not provide stock,
     * consider product available.
     */

    if (isNaN(stock)) {

      return true;

    }


    return stock > 0;

  }


  // =========================================================
  // STOCK TEXT
  // =========================================================

  getStockText(
    product: Product
  ): string {

    const item: any = product;


    const stock =
      Number(item.stock);


    if (isNaN(stock)) {

      return 'Available';

    }


    if (stock <= 0) {

      return 'Out of Stock';

    }


    return `${stock} Available`;

  }


  // =========================================================
  // PRICE
  // =========================================================

  getPrice(
    product: Product
  ): any {

    const item: any = product;


    return (
      item.price ??
      item.sellingPrice ??
      item.amount ??
      null
    );

  }


  // =========================================================
  // DISCOUNT PRICE
  // =========================================================

  getDiscountPrice(
    product: Product
  ): any {

    const item: any = product;


    return (
      item.discountPrice ??
      item.offerPrice ??
      item.salePrice ??
      null
    );

  }

}
