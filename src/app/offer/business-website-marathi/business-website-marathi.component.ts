import {
  Component,
  OnInit
} from '@angular/core';

import { SeoService }
from '../../common/seo.service';


@Component({
  selector: 'app-business-website-marathi',
  templateUrl: './business-website-marathi.component.html',
  styleUrls: ['./business-website-marathi.component.css']
})
export class BusinessWebsiteMarathiComponent implements OnInit {

  projectId = 'Ecom-01';

  productUrl =
    'https://psatechall.com/business-website-marathi';


  constructor(
    private seoService: SeoService
  ) {}


  ngOnInit(): void {

    this.seoService.updateMetaData({

      title:
        'आजच आपल्या व्यवसायाला ऑनलाइन आणा! - PSA TECH',

      description:
        'आपल्या व्यवसायासाठी प्रोफेशनल आणि आधुनिक बिझनेस वेबसाइट सोल्यूशन.',

      url:
        'https://psatechall.com/business-website-marathi'

    });

  }


  private getShareMessage(): string {

    return `🔥 आजच आपल्या व्यवसायाला ऑनलाइन आणा! 🔥

💻 प्रोफेशनल बिझनेस वेबसाइट

PSA TECH घेऊन आले आहे आपल्या व्यवसायासाठी खास Digital Business Website Solution.

━━━━━━━━━━━━━━━━━━

✨ वेबसाइटमध्ये मिळेल:

• Dynamic Website Design & Development
• 10 Pages Professional Website
• Home, About Us, Services आणि Contact Pages
• Photo Gallery आणि Video Section
• WhatsApp Chat आणि Click-to-Call सुविधा
• Free Domain Name आणि SSL Certificate
• Professional Business Email
• Mobile, Tablet आणि Desktop Friendly
• Fast Loading आणि SEO Optimized Website
• वेबसाइटची माहिती अपडेट करण्यासाठी Easy Admin Panel
• Google Analytics आणि Search Console Setup
• Live Chat आणि WhatsApp Integration
• 1 Year Technical Support
• Website Content आणि Basic Training

━━━━━━━━━━━━━━━━━━

🚀 अतिरिक्त फायदे:

• Website QR Code
• WhatsApp QR Code
• Google Maps QR Code

━━━━━━━━━━━━━━━━━━

🧾 स्मार्ट बिलिंग आणि इन्व्हेंटरी मॅनेजमेंट:

• Invoice तयार करा
• Stock Manage करा
• Bills तयार करा
• PDF Bills Share करा

━━━━━━━━━━━━━━━━━━

🌐 व्यवसायाची डिजिटल ओळख निर्माण करा
📈 Online Visibility वाढवा
👥 अधिक ग्राहकांपर्यंत पोहोचा
⏰ व्यवसायाची माहिती 24×7 उपलब्ध ठेवा
🚀 आपला व्यवसाय डिजिटल पद्धतीने वाढवा

━━━━━━━━━━━━━━━━━━

📝 नोंदणी / संपर्क करा

आपल्या व्यवसायाला ऑनलाइन आणायचे आहे का?

👉 खालील वेबसाइटला भेट द्या आणि Form मध्ये आपले नाव व WhatsApp नंबर भरा.

आमची PSA TECH टीम आपल्याशी लवकरच संपर्क करून संपूर्ण माहिती देईल.

━━━━━━━━━━━━━━━━━━

🔥 आजच आपल्या व्यवसायाला डिजिटल बनवा!

🔗 अधिक माहितीसाठी:
${this.productUrl}

📞 Call / WhatsApp: +91 8668267967

🌐 Website:
https://psatechall.com

🚀 आजच आपल्या व्यवसायाची डिजिटल ओळख निर्माण करा आणि व्यवसायाच्या वाढीस नवी दिशा द्या!`;

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
          'व्यवसायाची संपूर्ण माहिती यशस्वीरित्या कॉपी करण्यात आली!'
        );

      })
      .catch(() => {

        alert(
          'माहिती कॉपी करता आली नाही. कृपया पुन्हा प्रयत्न करा.'
        );

      });

  }

}