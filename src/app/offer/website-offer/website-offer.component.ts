import {
  Component,
  OnInit
} from '@angular/core';

import { SeoService }
from '../../common/seo.service';

@Component({
  selector: 'app-website-offer',
  templateUrl: './website-offer.component.html',
  styleUrls: ['./website-offer.component.css']
})
export class WebsiteOfferComponent implements OnInit {

  projectId = 'Ecom-01';

  productUrl =
    'https://psatechall.com/website-offer';

  constructor(
    private seoService: SeoService
  ) {}

  ngOnInit(): void {

    this.seoService.updateMetaData({

      title:
        'आपला व्यवसाय डिजिटल करा - PSA TECH',

      description:
        'आपल्या व्यवसायासाठी आधुनिक, प्रोफेशनल आणि मोबाईल फ्रेंडली वेबसाइट सोल्यूशन.',

      url:
        'https://psatechall.com/website-offer'

    });

  }


private getShareMessage(): string {

  return `🚀 आपल्या व्यवसायाला डिजिटल बनवा!

💻 प्रोफेशनल बिझनेस वेबसाइट सोल्यूशन

PSA TECH घेऊन आले आहे आपल्या व्यवसायासाठी आधुनिक आणि प्रोफेशनल डिजिटल वेबसाइट सोल्यूशन.

━━━━━━━━━━━━━━━━━━

✨ वेबसाइटमध्ये मिळेल:

• प्रोफेशनल वेबसाइट डिझाईन
• आधुनिक आणि आकर्षक वेबसाइट
• Home, About Us, Services आणि Contact Pages
• फोटो गॅलरी आणि व्हिडिओ सेक्शन
• WhatsApp Chat सुविधा
• Click-to-Call सुविधा
• Domain आणि SSL Support
• प्रोफेशनल Business Email
• Mobile, Tablet आणि Desktop Friendly
• Fast Loading Website
• SEO Optimized Website
• Easy Admin Panel
• Google Analytics आणि Search Console Setup
• WhatsApp Integration
• Technical Support
• Website Content आणि Basic Training

━━━━━━━━━━━━━━━━━━

🚀 अतिरिक्त डिजिटल फायदे:

• Website QR Code
• WhatsApp QR Code
• Google Maps Integration

━━━━━━━━━━━━━━━━━━

🧾 स्मार्ट बिझनेस सुविधा:

• Invoice तयार करा
• Stock Manage करा
• Bills तयार करा
• PDF Bill Share करा

━━━━━━━━━━━━━━━━━━

🌐 व्यवसायाची डिजिटल ओळख निर्माण करा
📈 Online Visibility वाढवा
👥 नवीन ग्राहकांपर्यंत पोहोचा
⏰ व्यवसायाची माहिती 24×7 उपलब्ध ठेवा
🚀 आपला व्यवसाय डिजिटल पद्धतीने वाढवा

━━━━━━━━━━━━━━━━━━

📝 नोंदणी / संपर्क करा

आपल्या व्यवसायासाठी प्रोफेशनल वेबसाइट तयार करायची आहे का?

👉 आमच्या वेबसाइटला भेट द्या आणि Form मध्ये आपले नाव व WhatsApp नंबर भरा.

आमची PSA TECH टीम आपल्याशी लवकरच संपर्क करून वेबसाइटबद्दल संपूर्ण माहिती देईल.

━━━━━━━━━━━━━━━━━━

🔥 आजच आपल्या व्यवसायाची डिजिटल सुरुवात करा!

🔗 नोंदणी करण्यासाठी:
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
          'संपूर्ण वेबसाइट माहिती कॉपी करण्यात आली आहे!'
        );

      })
      .catch(() => {

        alert(
          'माहिती कॉपी करता आली नाही. कृपया पुन्हा प्रयत्न करा.'
        );

      });

  }

}