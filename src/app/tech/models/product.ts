// src/app/models/product.ts

export interface SocialLink {
  label?: string;
  url?: string;
  icon?: string; // optional icon name (e.g. 'facebook', 'whatsapp')
}

export interface Product {
  _id?: string;

  code: string;
  name: string;
  description?: string;

  // PRICING
  basePrice: number;
  gstPercent: number;
  discountPercent?: number;
  discountedPrice?: number;
  priceWithGST?: number;

  // STOCK
  inStock?: boolean;
  stockQty?: number;

  // STATUS
  active?: boolean;

  // MEDIA
  photo?: string;
  galleryImages?: string[];
  pdfFile?: string;

  // CATEGORY & TAX
  category?: string;
  taxType?: 'HSN' | 'SAC';
  taxCode?: string;

  // LINKS
  socialLinks?: { label?: string; url: string }[];

  // META
  createdAt?: string;
  updatedAt?: string;
}

