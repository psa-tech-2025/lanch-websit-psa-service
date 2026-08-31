import {
  Component,
  OnInit
} from '@angular/core';

import { SeoService }
from '../../common/seo.service';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
projectId = 'Emmet-01';
  productUrl =
    'https://psatechall.com/business-website';


  constructor(
    private seoService: SeoService
  ) {}

  goToForm(): void {

  window.location.href =
    '/client-details?projectId=Emmet-01';

}

  ngOnInit(): void {
this.seoService.updateMetaData({

  title:
    'Take Your Business Online Today! - PSA TECH',

  description:
    'Professional Business Website at an Affordable Price. Special Offer Only ₹1499/-',

  url:
    'https://psatechall.com/business-website'

});

  }

  private getShareMessage(): string {

    return `🔥 TAKE YOUR BUSINESS ONLINE TODAY! 🔥

💻 Professional Business Website

💰 SPECIAL OFFER – ONLY ₹1499/-

PSA TECH घेऊन आले आहे आपल्या व्यवसायासाठी खास Digital Business Website Solution.

ALL FEATURES INCLUDED:

• Dynamic Website Design & Development
• 10 Pages Professional Website
• Home, About Us, Services & Contact Pages
• Photo Gallery & Video Section
• WhatsApp Chat & Click-to-Call Integration
• Free Domain Name with SSL Certificate
• Professional Business Email
• Mobile, Tablet & Desktop Friendly
• Fast Loading & SEO Optimized Website
• Easy Admin Panel to Manage Content
• Google Analytics & Search Console Setup
• Live Chat & WhatsApp Integration
• 1 Year Technical Support
• Website Content & Basic Training

🚀 EXTRA BENEFITS:

• Website QR Code
• WhatsApp QR Code
• Google Maps QR Code

🧾 SMART BILLING & INVENTORY MANAGEMENT:

• Create Invoices
• Manage Stock
• Generate Bills
• Share PDF Bills

🌐 Build Trust
📈 Increase Visibility
👥 Reach More Customers
⏰ Stay Online 24×7
🚀 Grow Your Business

🔥 TAKE YOUR BUSINESS ONLINE TODAY!

🔗 ${this.productUrl}

📞 +91 8668267967
🌐 https://psatechall.com`;

  }




  shareOnWhatsApp(): void {

    const message =
      this.getShareMessage();

    const whatsappUrl =
      'https://wa.me/?text=' +
      encodeURIComponent(message);

    window.open(
      whatsappUrl,
      '_blank'
    );

  }

  copyLink(): void {

    const message =
      this.getShareMessage();

    navigator.clipboard
      .writeText(message)
      .then(() => {

        alert(
          'Complete business details copied successfully!'
        );

      })
      .catch(() => {

        alert(
          'Unable to copy details. Please try again.'
        );

      });

  }

}