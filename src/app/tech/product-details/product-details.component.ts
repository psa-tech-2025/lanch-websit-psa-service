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
readonly projectId = 'Ecom-02';
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
    .getProductById(id, this.projectId)
    .subscribe({
      next: (product) => {
        console.log('Ecom-01 product details:', product);

        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading Ecom-01 product:', error);

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
  const raw = this.product?.description;

  if (!raw || !raw.trim()) {
    return [];
  }

  return raw
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => {
      if (!line) return false;

      // Remove separator-only lines
      if (/^[-_=*•\s]+$/.test(line)) return false;

      return true;
    })
    .map(line =>
      line.replace(/^(?:[-*•]+|\d+[.)])\s*/, '').trim()
    )
    .filter(Boolean);
}






  // =========================================================
  // SHARE DESCRIPTION
  // ONLY FIRST 5 POINTS
  // =========================================================
getShareDescriptionPoints(): string[] {
  return this.getDescriptionPoints();
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
  if (!this.product) return '';

  const esc = (value: string) => this.escapeHtml(value);

  const name = esc(this.product.name || 'Product');
  const category = esc(this.getCategory());
  const image = esc(this.getProductImage());
  const productUrl = esc(this.getProductDetailUrl());
  const website = esc(this.psaTechWebsite);
  const instagram = esc(this.instagramUrl);
  const facebook = esc(this.facebookUrl);
  const gst = esc(this.gstNumber);
  const contact = esc(this.contactNumber);

  const points = this.getShareDescriptionPoints();

  const bullets = points.map((point, index) => {
    const colors = [
      '#2563eb', '#7c3aed', '#0891b2',
      '#059669', '#ea580c', '#db2777'
    ];

    const color = colors[index % colors.length];

    return `
      <div style="display:block;margin:0 0 10px;
                  padding:11px 13px;
                  background:#f8fafc;
                  border:1px solid #e2e8f0;
                  border-radius:14px;
                  font-family:Arial,sans-serif;
                  font-size:15px;line-height:1.7;
                  color:#263449;">

        <span style="display:inline-block;
                     width:24px;height:24px;
                     line-height:24px;text-align:center;
                     background:${color};color:#ffffff;
                     border-radius:50%;
                     font-size:13px;font-weight:bold;
                     margin-right:9px;">
          ✓
        </span>

        <span>${esc(point)}</span>
      </div>
    `;
  }).join('');

  return `
  <div style="width:100%;max-width:680px;
              font-family:Arial,Helvetica,sans-serif;
              color:#1e293b;">

    <div style="margin-bottom:14px;">
      <a href="${productUrl}" target="_blank">
        <img src="${image}" alt="${name}"
             style="display:block;width:100%;
                    max-width:360px;height:auto;
                    max-height:300px;object-fit:contain;
                    border-radius:18px;border:1px solid #e2e8f0;">
      </a>
    </div>

    <div style="display:inline-block;
                padding:7px 15px;margin-bottom:12px;
                background:#dcfce7;color:#166534;
                border:1px solid #86efac;
                border-radius:22px;font-size:13px;
                font-weight:bold;">
      ${category}
    </div>

    <h2 style="margin:0 0 18px;padding:14px 16px;
               background:#fff7ed;color:#9a3412;
               border-left:5px solid #f97316;
               border-radius:12px;
               font-size:25px;line-height:1.4;">
      ${name}
    </h2>

    <div style="padding:15px;
                background:#ffffff;
                border:1px solid #dbeafe;
                border-radius:18px;">

      <h3 style="margin:0 0 15px;padding-bottom:10px;
                 color:#1d4ed8;
                 border-bottom:2px solid #dbeafe;
                 font-size:19px;">
        📋 Product Description
      </h3>

      ${bullets || '<p>Contact us for more information.</p>'}
    </div>

    <div style="margin:20px 0;">
      <a href="${productUrl}" target="_blank"
         style="display:inline-block;
                padding:13px 22px;
                background:#2563eb;color:#ffffff;
                border-radius:25px;
                font-size:15px;font-weight:bold;
                text-decoration:none;">
        🛍️ View Product →
      </a>
    </div>

    <div style="padding:19px;
                background:#fff7ed;
                border:1px solid #fed7aa;
                border-radius:18px;">

      <div style="color:#b91c1c;font-size:28px;
                  font-weight:900;letter-spacing:1px;">
        PSA TECH
      </div>

      <div style="margin-top:4px;color:#475569;
                  font-size:15px;font-weight:bold;">
        Your Digital Partner
      </div>

      <div style="margin-top:16px;">
        <a href="${website}" target="_blank"
           style="display:inline-block;
                  padding:10px 14px;
                  background:#dbeafe;color:#1d4ed8;
                  border:1px solid #93c5fd;
                  border-radius:25px;
                  text-decoration:none;font-weight:bold;">
          🌐 www.psatechall.com
        </a>
      </div>

      <p style="margin:14px 0 6px;font-size:14px;color:#334155;">
        <strong>GST:</strong> ${gst}
      </p>

      <p style="margin:6px 0;font-size:14px;color:#334155;">
        <strong>📞 Contact:</strong>
        <a href="tel:${contact}"
           style="color:#0f766e;text-decoration:none;font-weight:bold;">
          ${contact}
        </a>
      </p>

      <div style="margin-top:16px;">
        <a href="${instagram}" target="_blank"
           style="display:inline-block;margin:0 8px 8px 0;
                  padding:11px 16px;
                  background:#c13584;color:#ffffff;
                  border-radius:25px;text-decoration:none;
                  font-size:14px;font-weight:bold;">
          📸 Instagram
        </a>

        <a href="${facebook}" target="_blank"
           style="display:inline-block;margin-bottom:8px;
                  padding:11px 16px;
                  background:#1877f2;color:#ffffff;
                  border-radius:25px;text-decoration:none;
                  font-size:14px;font-weight:bold;">
          f Facebook
        </a>
      </div>
    </div>

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
    .map(point => `✓ ${point}`)
    .join('\n');

  return [
    '🛍️ ' + (this.product.name || 'Product'),
    '',
    '📂 Category: ' + this.getCategory(),
    '',
    '📋 PRODUCT DESCRIPTION',
    '',
    descriptionText || 'Contact us for more information.',
    '',
    '🔗 VIEW PRODUCT:',
    this.getProductDetailUrl(),
    '',
    '━━━━━━━━━━━━━━━━━━━━',
    '🔴 PSA TECH',
    '💼 Your Digital Partner',
    '',
    '🌐 WEBSITE:',
    'https://www.psatechall.com',
    '',
    '📞 CONTACT: ' + this.contactNumber,
    'GST: ' + this.gstNumber,
    '',
    '📸 INSTAGRAM:',
    this.instagramUrl,
    '',
    '📘 FACEBOOK:',
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