import {
  Component,
  OnInit
} from '@angular/core';

import { SeoService }
from '../../common/seo.service';


@Component({
  selector: 'app-business-partnership',
  templateUrl: './business-partnership.component.html',
  styleUrls: ['./business-partnership.component.css']
})
export class BusinessPartnershipComponent implements OnInit {


  projectId = 'Ecom-01';


  productUrl =
    'https://psatechall.com/business-partnership';


  constructor(
    private seoService: SeoService
  ) {}


  ngOnInit(): void {

    this.seoService.updateMetaData({

      title:
        'PSA TECH Business Partnership Program - Start Your Digital Business',

      description:
        'Join PSA TECH Business Partnership Program. Zero Investment, Partner Dashboard, Personal Partner ID, Marketing Support, Technical Support and 35% Commission Opportunity.',

      url:
        'https://psatechall.com/business-partnership'

    });

  }


private getShareMessage(): string {

  return `🚀 PSA TECH BUSINESS PARTNERSHIP PROGRAM 🚀

💼 Start Your Own Digital Business with PSA TECH!

💰 EARN MORE THAN ₹50,000+ POTENTIAL

🌟 A Great Business Opportunity for Entrepreneurs, Freelancers, Sales Professionals and Digital Service Providers!

No Technical Knowledge Required! 🙌

Become an Authorized PSA TECH Business Partner and start building your own digital services business.

━━━━━━━━━━━━━━━━━━

🤝 WHY JOIN PSA TECH BUSINESS PARTNERSHIP?

✅ Zero Investment Opportunity
✅ Attractive 35% Commission Opportunity
✅ Earn ₹50K+ Income Potential
✅ Personal Partner ID
✅ Dedicated Partner Dashboard
✅ Complete Marketing Support
✅ Full Technical Support
✅ PAN India Business Opportunity
✅ No Technical Knowledge Required
✅ Lifetime Business Opportunity
✅ 24×7 Support

━━━━━━━━━━━━━━━━━━

💻 OUR DIGITAL SERVICES:

🌐 Dynamic Website Development
🖥️ Static Website Packages
⚙️ Custom Website Development
💼 Professional Business Websites
🛒 E-Commerce Solutions
📱 Digital Business Solutions

━━━━━━━━━━━━━━━━━━

🎯 YOUR ROLE AS A BUSINESS PARTNER:

• Find and connect with potential customers
• Generate customer enquiries
• Understand customer requirements
• Share project requirements with PSA TECH
• PSA TECH handles the technical development
• You earn commission on successful projects 💰

━━━━━━━━━━━━━━━━━━

🔥 START YOUR OWN BUSINESS JOURNEY TODAY!

🤝 Join PSA TECH as a Business Partner and build your own digital business.

📲 To Join:
Enter your Name and WhatsApp Number on our website form and our team will contact you shortly.

🌐 Visit & Register:
${this.productUrl}

📞 Contact / WhatsApp: +91 8668267967
🌐 Website: https://psatechall.com

🚀 Don't Miss This Business Opportunity!

👉 JOIN PSA TECH BUSINESS PARTNERSHIP TODAY!`;

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
          'Business Partnership details copied successfully!'
        );

      })
      .catch(() => {

        alert(
          'Unable to copy details. Please try again.'
        );

      });

  }

}