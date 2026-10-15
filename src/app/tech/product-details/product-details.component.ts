import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | null = null;

  loading = false;
  error = false;


  // =========================================================
  // PSA TECH INFORMATION
  // =========================================================


readonly psaTechName = 'PSA TECH';
readonly psaTechTagline = 'Digital Partner';
readonly psaTechWebsite = 'https://www.psatechall.com';

readonly gstNumber = '27CNHPP3471L1ZG';
readonly contactNumber = '8668267967';

readonly instagramUrl =
  'https://www.instagram.com/digitaltechpsa/?hl=en';

readonly facebookUrl =
  'https://www.facebook.com/profile.php?id=61591377065125';



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      console.log(
        'Product ID:',
        id
      );

      if (id) {

        this.loadProduct(id);

      } else {

        this.error = true;

      }

    });

  }


  // =========================================================
  // LOAD PRODUCT
  // =========================================================

  loadProduct(id: string): void {

    this.loading = true;

    this.error = false;

    this.product = null;


    this.productService
      .getProductById(id)
      .subscribe({

        next: (product) => {

          console.log(
            'Product details:',
            product
          );

          this.product = product;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Error loading product details:',
            error
          );

          this.product = null;

          this.error = true;

          this.loading = false;

        }

      });

  }


  // =========================================================
  // PRODUCT IMAGE
  // =========================================================

  getProductImage(): string {

    if (!this.product) {

      return 'assets/images/no-image.png';

    }

    if (this.product.photo) {

      return this.getFileUrl(
        this.product.photo
      );

    }

    return 'assets/images/no-image.png';

  }


  // =========================================================
  // FILE URL
  // =========================================================

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

    const cleanPath =
      path.replace(/^\/uploads/, '');

    return `${environment.uploadUrl}${cleanPath}`;

  }


  // =========================================================
  // IMAGE ERROR
  // =========================================================

  onImageError(event: Event): void {

    const image =
      event.target as HTMLImageElement;

    image.src =
      'assets/images/no-image.png';

  }


  // =========================================================
  // CATEGORY
  // =========================================================

  getCategory(): string {

    if (!this.product) {

      return 'Other Services';

    }

    const item: any =
      this.product;

    return (
      item.category ||
      item.productCategory ||
      item.type ||
      'Other Services'
    );

  }


  // =========================================================
  // PRICE
  // =========================================================

  getPrice(): any {

    if (!this.product) {

      return null;

    }

    const item: any =
      this.product;

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

  getDiscountPrice(): any {

    if (!this.product) {

      return null;

    }

    const item: any =
      this.product;

    return (
      item.discountPrice ??
      item.offerPrice ??
      item.salePrice ??
      null
    );

  }


  // =========================================================
  // STOCK
  // =========================================================

  isInStock(): boolean {

    if (!this.product) {

      return false;

    }

    const item: any =
      this.product;

    const stock =
      Number(item.stock);

    if (isNaN(stock)) {

      return true;

    }

    return stock > 0;

  }


  // =========================================================
  // STOCK TEXT
  // =========================================================

  getStockText(): string {

    if (!this.product) {

      return '';

    }

    const item: any =
      this.product;

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
  // DESCRIPTION POINTS
  // =========================================================

  getDescriptionPoints(): string[] {

    if (!this.product?.description) {

      return [];

    }

    return this.product.description

      .replace(/\r\n/g, '\n')

      .replace(/\r/g, '\n')

      .split(/[.|]+|\n+/)

      .map(point => point.trim())

      .filter(
        point => point.length > 0
      );

  }


  // =========================================================
  // SHARE DESCRIPTION
  // ONLY FIRST 5 POINTS
  // =========================================================

  getShareDescriptionPoints(): string[] {

    return this
      .getDescriptionPoints()
      .slice(0, 5);

  }


  // =========================================================
  // PRODUCT DETAIL URL
  // =========================================================

  getProductDetailUrl(): string {

    if (!this.product) {

      return '';

    }

    const item: any =
      this.product;

    /*
     * Product model does not have "id"
     * in TypeScript.
     *
     * Check possible backend identifiers.
     */

    const productId =
      item.id ??
      item._id ??
      item.productId ??
      item.code;

    if (!productId) {

      console.error(
        'Product ID not found:',
        this.product
      );

      return `${this.psaTechWebsite}/tech/product`;

    }

    return `${this.psaTechWebsite}/tech/product/${encodeURIComponent(productId)}`;

  }


  // =========================================================
  // COPY PRODUCT MESSAGE
  // =========================================================


async copyProductMessage(): Promise<void> {
  if (!this.product) {
    alert('Product details are not loaded yet.');
    return;
  }

  const html = this.createShareHtml();
  const text = this.createShareText();

  try {
    if (
      navigator.clipboard?.write &&
      typeof ClipboardItem !== 'undefined'
    ) {
      const htmlBlob = new Blob(
        [html],
        { type: 'text/html' }
      );

      const textBlob = new Blob(
        [text],
        { type: 'text/plain' }
      );

      const clipboardItem = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob
      });

      await navigator.clipboard.write([clipboardItem]);
      this.showCopySuccess();
      return;
    }

    await navigator.clipboard.writeText(text);
    this.showCopySuccess();

    alert(
      'Plain text copied. This clipboard mode cannot include styled social icons.'
    );
  } catch (error) {
    console.error('Product message copy failed:', error);

    alert(
      'Rich copy was blocked by the browser. Open the website over HTTPS, allow clipboard access, and try again.'
    );
  }
}



  // =========================================================
  // CREATE RICH HTML MESSAGE
  // =========================================================


private createShareHtml(): string {
  if (!this.product) {
    return '';
  }

  const productName = this.escapeHtml(this.product.name || '');
  const category = this.escapeHtml(this.getCategory());
  const imageUrl = this.escapeHtml(this.getProductImage());
  const productUrl = this.escapeHtml(this.getProductDetailUrl());
  const websiteUrl = this.escapeHtml(this.psaTechWebsite);
  const instagramUrl = this.escapeHtml(this.instagramUrl);
  const facebookUrl = this.escapeHtml(this.facebookUrl);
  const gst = this.escapeHtml(this.gstNumber);
  const contact = this.escapeHtml(this.contactNumber);

  const descriptionHtml = this.getShareDescriptionPoints()
    .map(point => `
      <table role="presentation"
        cellpadding="0" cellspacing="0" border="0"
        style="width:100%;margin:0 0 10px;border-collapse:collapse;">
        <tr>
          <td valign="top"
            style="width:25px;padding:0 8px 0 0;
            color:#334155;font-size:20px;font-weight:bold;
            line-height:1.6;">
            ◉
          </td>
          <td valign="top"
            style="color:#334155;font-family:Arial,Helvetica,sans-serif;
            font-size:16px;line-height:1.65;font-weight:700;">
            ${this.escapeHtml(point)}
          </td>
        </tr>
      </table>
    `)
    .join('');

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;
              max-width:700px;color:#172033;">

    <!-- PRODUCT IMAGE -->
    <div style="width:50%;max-width:350px;min-width:220px;
                margin:0 0 16px;">
      <a href="${productUrl}" target="_blank"
         style="text-decoration:none;">
        <img src="${imageUrl}" alt="${productName}"
          style="display:block;width:100%;height:auto;
          max-height:300px;object-fit:contain;border:0;
          border-radius:12px;">
      </a>
    </div>

    <!-- CATEGORY -->
    <div style="display:inline-block;margin-bottom:9px;
                padding:6px 12px;background:#ecfdf5;
                color:#166534;border:1px solid #bbf7d0;
                border-radius:20px;font-size:11px;font-weight:bold;">
      ${category}
    </div>

    <!-- PRODUCT NAME -->
    <h2 style="margin:4px 0 15px;color:#7a3e00;
               font-size:25px;line-height:1.3;font-weight:900;">
      ${productName}
    </h2>

    <!-- DESCRIPTION -->
    <div style="width:100%;margin:10px 0 16px;padding:16px;
                background:#f8fafc;border:1px solid #e2e8f0;
                border-radius:12px;">

      <h3 style="margin:0 0 12px;color:#0f172a;
                 font-size:19px;font-weight:900;">
        Description
      </h3>

      ${descriptionHtml}
    </div>

    <!-- VIEW MORE -->
    <div style="margin:16px 0 20px;">
      <a href="${productUrl}" target="_blank"
         style="display:inline-block;padding:11px 22px;
         background:#2563eb;color:#ffffff;text-decoration:none;
         border-radius:8px;font-size:14px;font-weight:bold;">
        View More
      </a>
    </div>

    <!-- PSA TECH FOOTER -->
    <table role="presentation" cellpadding="0" cellspacing="0"
      border="0"
      style="width:100%;max-width:500px;border-collapse:collapse;
             border-top:2px solid #e2e8f0;">
      <tr>
        <td style="padding-top:16px;">

          <div style="color:#7a3e00;font-size:23px;
                      font-weight:900;line-height:1.4;">
            PSA TECH
          </div>

          <div style="color:#475569;font-size:15px;
                      font-weight:bold;margin-top:3px;">
            Digital Partner
          </div>

          <!-- WEBSITE -->
          <div style="margin-top:8px;font-size:15px;">
            <a href="${websiteUrl}" target="_blank"
               style="color:#2563eb;font-weight:bold;
                      text-decoration:none;">
              www.psatechall.com
            </a>
          </div>

          <!-- GST -->
          <div style="margin-top:8px;color:#334155;
                      font-size:14px;line-height:1.6;">
            <strong>GST:</strong> ${gst}
          </div>

          <!-- CONTACT -->
          <div style="margin-top:4px;color:#334155;
                      font-size:14px;line-height:1.6;">
            <strong>Contact:</strong>
            <a href="tel:${contact}"
               style="color:#334155;text-decoration:none;">
              ${contact}
            </a>
          </div>

          <!-- SOCIAL ICONS: ICONS ONLY -->
          <table role="presentation" cellpadding="0" cellspacing="0"
            border="0"
            style="margin-top:14px;border-collapse:collapse;">
            <tr>
              <!-- INSTAGRAM -->
              <td style="padding-right:12px;">
                <a href="${instagramUrl}" target="_blank"
                   title="Instagram"
                   style="display:inline-block;text-decoration:none;">
                  <table role="presentation" cellpadding="0"
                    cellspacing="0" border="0"
                    style="width:42px;height:42px;background:#c13584;
                           border-radius:10px;">
                    <tr>
                      <td align="center" valign="middle">
                        <svg xmlns="http://www.w3.org/2000/svg"
                          width="25" height="25" viewBox="0 0 24 24"
                          fill="none" aria-label="Instagram">
                          <rect x="3" y="3" width="18" height="18"
                            rx="5" stroke="#ffffff" stroke-width="2"/>
                          <circle cx="12" cy="12" r="4"
                            stroke="#ffffff" stroke-width="2"/>
                          <circle cx="17.5" cy="6.5" r="1.2"
                            fill="#ffffff"/>
                        </svg>
                      </td>
                    </tr>
                  </table>
                </a>
              </td>

              <!-- FACEBOOK -->
              <td>
                <a href="${facebookUrl}" target="_blank"
                   title="Facebook"
                   style="display:inline-block;text-decoration:none;">
                  <table role="presentation" cellpadding="0"
                    cellspacing="0" border="0"
                    style="width:42px;height:42px;background:#1877f2;
                           border-radius:10px;">
                    <tr>
                      <td align="center" valign="middle">
                        <svg xmlns="http://www.w3.org/2000/svg"
                          width="25" height="25" viewBox="0 0 24 24"
                          fill="#ffffff" aria-label="Facebook">
                          <path d="M14 8h2V4h-3a5 5 0 0 0-5 5v3H5v4h3v6h4v-6h3l1-4h-4V9a1 1 0 0 1 1-1z"/>
                        </svg>
                      </td>
                    </tr>
                  </table>
                </a>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </div>`;
}



  // =========================================================
  // CREATE PLAIN TEXT MESSAGE
  // =========================================================


private createShareText(): string {
  if (!this.product) {
    return '';
  }

  const descriptionText = this.getShareDescriptionPoints()
    .map(point => `◉ ${point}`)
    .join('\n');

  return [
    this.product.name,
    '',
    'Description',
    '',
    descriptionText,
    '',
    'View More:',
    this.getProductDetailUrl(),
    '',
    'PSA TECH',
    'Digital Partner',
    '',
    'www.psatechall.com',
    `GST: ${this.gstNumber}`,
    `Contact: ${this.contactNumber}`,
    '',
    this.instagramUrl,
    this.facebookUrl
  ].join('\n');
}



  // =========================================================
  // ESCAPE HTML
  // =========================================================

  private escapeHtml(
    value: string
  ): string {

    return value

      .replace(
        /&/g,
        '&amp;'
      )

      .replace(
        /</g,
        '&lt;'
      )

      .replace(
        />/g,
        '&gt;'
      )

      .replace(
        /"/g,
        '&quot;'
      )

      .replace(
        /'/g,
        '&#039;'
      );

  }


  // =========================================================
  // COPY SUCCESS
  // =========================================================

  showCopySuccess(): void {

    const button =
      document.querySelector(
        '.copy-product-btn'
      ) as HTMLButtonElement | null;


    if (!button) {

      return;

    }


    const originalText =
      button.innerHTML;


    button.innerHTML = `
      <i class="bi bi-check-circle"></i>
      Copied!
    `;


    button.classList.add(
      'copy-success'
    );


    setTimeout(() => {

      button.innerHTML =
        originalText;

      button.classList.remove(
        'copy-success'
      );

    }, 2200);

  }


  // =========================================================
  // BACK TO PRODUCTS
  // =========================================================

  goBack(): void {

    this.router.navigate([
      '/tech/product'
    ]);

  }


  // =========================================================
  // RETRY
  // =========================================================

  retry(): void {

    const id =
      this.route.snapshot.paramMap.get(
        'id'
      );

    if (id) {

      this.loadProduct(id);

    }

  }

}