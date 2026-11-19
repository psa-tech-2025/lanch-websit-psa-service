
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../common/seo.service';

@Component({
  selector: 'app-gram-panchayat-website',
  templateUrl: './gram-panchayat-website.component.html',
  styleUrls: ['./gram-panchayat-website.component.css']
})
export class GramPanchayatWebsiteComponent implements OnInit {

  productUrl = 'https://psatechall.com/gram-panchayat-website';

  constructor(
    private seoService: SeoService
  ) {}

  ngOnInit(): void {

    this.seoService.updateMetaData({

      title:
        'ग्रामपंचायत डिजिटल वेबसाइट सेवा | PSA TECH',

      description:
        'ग्रामपंचायतीसाठी आधुनिक Digital Website Solution. ग्रामपंचायत माहिती, सरपंच व सदस्य, ग्रामसभा निर्णय, सरकारी योजना, सूचना, फोटो गॅलरी आणि नागरिकांसाठी डिजिटल सेवा.',

      url: this.productUrl

    });

  }


  // COMPLETE SHARE MESSAGE
  private getShareMessage(): string {

    return `🏛️ आपल्या ग्रामपंचायतीला डिजिटल बनवा!

🌐 ग्रामपंचायत डिजिटल वेबसाइट सेवा
PSA TECH - Professional Web Development & IT Solutions

आम्ही तयार करून देतो Secure, Modern आणि Citizen-Friendly Gram Panchayat Websites ज्यामुळे ग्रामपंचायतीची माहिती नागरिकांना ऑनलाइन उपलब्ध होते आणि गाव प्रशासन अधिक पारदर्शक व डिजिटल बनते.

━━━━━━━━━━━━━━━━━━

✨ ग्रामपंचायत वेबसाइटमध्ये मिळणाऱ्या सुविधा:

🏛️ ग्रामपंचायतीची संपूर्ण माहिती
👨‍💼 सरपंच व सदस्यांची माहिती
📢 गावातील सूचना व जाहिराती
📜 ग्रामसभा निर्णय आणि ठराव
📸 गावाची फोटो गॅलरी
📞 ग्रामपंचायत संपर्क माहिती
📍 Google Maps Location
🌐 Unique Domain Name
📱 Mobile Friendly Website

━━━━━━━━━━━━━━━━━━

📚 ग्रामपंचायत डिजिटल सेवा:

● ग्रामपंचायत माहिती पोर्टल
● गावातील सूचना आणि घोषणा
● ग्रामसभा निर्णय माहिती
● सरकारी योजनांची माहिती
● कार्यक्रम व उपक्रम माहिती
● नागरिक संपर्क / सूचना
━━━━━━━━━━━━━━━━━━

🔳 QR CODE सुविधा:

✓ Website QR Code
✓ WhatsApp Contact QR Code
✓ Google Maps QR Code
QR Code स्कॅन करून नागरिकांना वेबसाइट, संपर्क आणि लोकेशन सहज उपलब्ध करून देता येईल.
━━━━━━━━━━━━━━━━━━

⚙️ Professional Website Features:

✓ १० पर्यंत सानुकूलित वेबसाइट पेजेस
✓ Home, About, Services, Gallery आणि Contact Pages
✓ फोटो गॅलरी आणि लेख / ब्लॉग विभाग
✓ WhatsApp Chat Integration
✓ Click-to-Call Integration
✓ Google Maps आणि Social Media Integration
✓ पूर्णपणे Responsive Website Design
✓ Admin Panel
✓ Google Analytics आणि Search Console Setup
✓ Fast Loading आणि Optimized Performance
✓ वेबसाइट कंटेंट अपडेट्ससाठी मूलभूत प्रशिक्षण

━━━━━━━━━━━━━━━━━━

🌟 डिजिटल ग्रामपंचायत वेबसाइटचे फायदे:

● ग्रामपंचायतीची माहिती ऑनलाइन उपलब्ध
● गावातील सूचना नागरिकांपर्यंत पोहोचवणे सोपे
● नागरिक आणि प्रशासन यांच्यात संपर्क सुलभ
● सरकारी योजनांची माहिती सहज उपलब्ध
● गावाच्या डिजिटल विकासाला चालना
━━━━━━━━━━━━━━━━━━

🚀 आजच आपल्या ग्रामपंचायतीला डिजिटल बनवा!

आपल्या ग्रामपंचायतीसाठी आधुनिक Digital Website तयार करण्यासाठी PSA TECH शी संपर्क साधा.
━━━━━━━━━━━━━━━━━━

Mr. Shailesh Pawar
📞 Call / WhatsApp:
+91 8668267967

🌐 Website:🔗 अधिक माहिती व नोंदणी:
${this.productUrl}

🏛️ PSA TECH
Web Development & IT Solutions

आपल्या गावाची डिजिटल ओळख निर्माण करा! 🚀`;

  }


  // WHATSAPP SHARE
  shareOnWhatsApp(): void {

    const message = this.getShareMessage();

    const whatsappUrl =
      'https://wa.me/?text=' +
      encodeURIComponent(message);

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer'
    );

  }


  // FACEBOOK SHARE
  shareOnFacebook(): void {

    const facebookUrl =
      'https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURIComponent(this.productUrl);

    window.open(
      facebookUrl,
      '_blank',
      'noopener,noreferrer'
    );

  }


  // COPY COMPLETE MESSAGE
  async copyLink(): Promise<void> {

    const message = this.getShareMessage();

    try {

      if (navigator.clipboard &&
          window.isSecureContext) {

        await navigator.clipboard.writeText(message);

      } else {

        const textArea = document.createElement('textarea');

        textArea.value = message;

        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const copied = document.execCommand('copy');

        document.body.removeChild(textArea);

        if (!copied) {
          throw new Error('Copy failed');
        }

      }

      alert(
        'Complete Gram Panchayat website details copied successfully!'
      );

    } catch (error) {

      console.error('Copy Error:', error);

      alert(
        'Unable to copy details. Please try again.'
      );

    }

  }

}
