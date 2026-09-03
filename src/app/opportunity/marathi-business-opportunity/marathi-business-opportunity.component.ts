import {
  Component,
  OnInit
} from '@angular/core';

import { SeoService }
from '../../common/seo.service';

@Component({
  selector: 'app-marathi-business-opportunity',
  templateUrl:
    './marathi-business-opportunity.component.html',
  styleUrls:
    ['./marathi-business-opportunity.component.css']
})
export class MarathiBusinessOpportunityComponent
  implements OnInit {

  productUrl =
    'https://psatechall.com/offer-business-opportunity';

  projectId = 'Business-Opportunity-01';

  constructor(
    private seoService: SeoService
  ) {}

  ngOnInit(): void {

    this.seoService.updateMetaData({

      title:
        'व्यवसायाची संधी | PSA TECH सोबत कमाईची संधी',

      description:
        'PSA TECH सोबत डिजिटल सर्व्हिसेसच्या माध्यमातून व्यवसायाची संधी. मराठी उद्योजकांसाठी नवीन डिजिटल बिझनेस ऑपर्च्युनिटी.',

      url:
        this.productUrl

    });

  }


private getShareMessage(): string {

  return `🚀 PSA TECH व्यवसाय भागीदारीची सुवर्णसंधी! 🚀

💼 PSA TECH सोबत तुमचा स्वतःचा डिजिटल व्यवसाय सुरू करा!

💰 दर महिन्याला ₹50,000+ किंवा त्यापेक्षा जास्त कमाई करण्याची क्षमता!

🌟 मराठी उद्योजक, युवक, फ्रीलान्सर आणि व्यवसाय वाढवू इच्छिणाऱ्या व्यक्तींसाठी खास व्यवसायाची संधी!

तांत्रिक ज्ञान आवश्यक नाही! 🙌

PSA TECH चे अधिकृत Business Partner बना आणि डिजिटल सेवांचा स्वतःचा व्यवसाय सुरू करा.

━━━━━━━━━━━━━━━━━━

🤝 PSA TECH BUSINESS PARTNERSHIP का जॉइन कराल?

✅ Zero Investment व्यवसायाची संधी
✅ आकर्षक 35% Commission संधी
✅ ₹50,000+ कमाई करण्याची क्षमता
✅ स्वतःचा Partner ID
✅ Partner Dashboard
✅ Marketing Support
✅ पूर्ण Technical Support
✅ PAN India Business Opportunity
✅ तांत्रिक ज्ञानाची आवश्यकता नाही
✅ दीर्घकालीन व्यवसायाची संधी
✅ 24×7 Support

━━━━━━━━━━━━━━━━━━

💻 आमच्या डिजिटल सेवा:

🌐 Dynamic Website Development
🖥️ Static Website Development
⚙️ Custom Website Development
💼 Professional Business Websites
🛒 E-Commerce Solutions
📱 Digital Business Solutions
🤖 AI आधारित डिजिटल सेवा
📊 Online Business Services

━━━━━━━━━━━━━━━━━━

🎯 Business Partner म्हणून तुमचे काम:

• नवीन ग्राहक शोधणे आणि त्यांच्याशी संपर्क करणे
• Customer Enquiries मिळवणे
• ग्राहकांच्या गरजा समजून घेणे
• Project Requirements PSA TECH ला पाठवणे
• Technical काम PSA TECH Team करेल
• यशस्वी Project वर Commission मिळवण्याची संधी 💰

━━━━━━━━━━━━━━━━━━

🚀 तुमचा स्वतःचा डिजिटल व्यवसाय आजच सुरू करा!

🤝 PSA TECH Business Partner म्हणून जॉइन व्हा आणि स्वतःचा व्यवसाय वाढवा.

📲 जॉइन करण्यासाठी:

वेबसाइटवरील Form मध्ये तुमचे नाव आणि WhatsApp नंबर भरा.

आमची टीम तुम्हाला लवकरच संपर्क करेल.

🔗 अधिक माहितीसाठी:
${this.productUrl}

📞 Call / WhatsApp: +91 8668267967
🌐 Website: https://psatechall.com

🔥 ही व्यवसायाची संधी गमावू नका!

👉 आजच PSA TECH BUSINESS PARTNERSHIP PROGRAM मध्ये सहभागी व्हा! 🚀`;

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
          'व्यवसायाची संपूर्ण माहिती कॉपी झाली!'
        );

      })
      .catch(() => {

        alert(
          'माहिती कॉपी करता आली नाही. कृपया पुन्हा प्रयत्न करा.'
        );

      });

  }

}