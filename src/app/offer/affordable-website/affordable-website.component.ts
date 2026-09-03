import {
  Component,
  OnInit
} from '@angular/core';

import { SeoService }
from '../../common/seo.service';

@Component({
  selector: 'app-affordable-website',
  templateUrl: './affordable-website.component.html',
  styleUrls: ['./affordable-website.component.css']
})
export class AffordableWebsiteComponent implements OnInit {

projectId = 'Emmet-01';
  productUrl =
    'https://psatechall.com/affordable-website';

  constructor(
    private seoService: SeoService
  ) {}

  ngOnInit(): void {

    this.seoService.updateMetaData({

      title:
        'Affordable Professional Website Solutions - PSA TECH',

      description:
        'Get a professional, modern and mobile-friendly website for your business with complete digital solutions from PSA TECH.',

      url:
        'https://psatechall.com/affordable-website'

    });

  }


private getShareMessage(): string {

  return `🚀 BUILD YOUR DIGITAL PRESENCE TODAY!

💻 Affordable Professional Website Solution

PSA TECH brings a complete digital website solution for your business.

━━━━━━━━━━━━━━━━━━

✨ ALL FEATURES INCLUDED:

• Professional Website Design & Development
• Modern & Dynamic Website
• Home, About Us, Services & Contact Pages
• Photo Gallery & Video Section
• WhatsApp Chat Integration
• Click-to-Call Feature
• Domain & SSL Support
• Professional Business Email
• Mobile, Tablet & Desktop Friendly
• Fast Loading Website
• SEO Optimized Structure
• Easy Admin Panel
• Google Analytics & Search Console Setup
• Live Chat & WhatsApp Integration
• Technical Support
• Website Content & Basic Training

━━━━━━━━━━━━━━━━━━

🚀 EXTRA DIGITAL BENEFITS:

• Website QR Code
• WhatsApp QR Code
• Google Maps Integration

━━━━━━━━━━━━━━━━━━

🧾 SMART BUSINESS FEATURES:

• Create Invoices
• Manage Stock
• Generate Bills
• Share PDF Bills

━━━━━━━━━━━━━━━━━━

🌐 Build Your Digital Presence
📈 Increase Online Visibility
👥 Reach More Customers
⏰ Stay Available 24×7
🚀 Grow Your Business

━━━━━━━━━━━━━━━━━━

📝 REGISTER / CONTACT US

Interested in taking your business online?

👉 Visit our website and fill in your Name and WhatsApp Number.

Our PSA TECH team will contact you shortly and provide complete information about our website solutions.

━━━━━━━━━━━━━━━━━━

🔥 START YOUR DIGITAL JOURNEY TODAY!

🔗 Register Now:
${this.productUrl}

📞 Call / WhatsApp: +91 8668267967

🌐 Website:
https://psatechall.com

🚀 Build your digital presence and grow your business today!`;

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
          'Complete website details copied successfully!'
        );

      })
      .catch(() => {

        alert(
          'Unable to copy details. Please try again.'
        );

      });

  }

}