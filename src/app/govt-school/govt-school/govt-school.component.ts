import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../common/seo.service';

@Component({
  selector: 'app-govt-school',
  templateUrl: './govt-school.component.html',
  styleUrls: ['./govt-school.component.css']
})
export class GovtSchoolComponent implements OnInit {

  productUrl = 'https://psatechall.com/govt-school';

  constructor(
    private seoService: SeoService
  ) {}

  ngOnInit(): void {

    this.seoService.updateMetaData({

      title:
        'आपल्या शाळेला आता डिजिटल बनवा! - PSA TECH',

      description:
        'फक्त ₹999 मध्ये Zilla Parishad / Government School साठी Digital School Website Solution.',

      url:
        'https://psatechall.com/govt-school'

    });

  }


  // SAME MESSAGE FOR WHATSAPP AND COPY
  private getShareMessage(): string {

    return `आपल्या शाळेला आता डिजिटल बनवा!

फक्त ₹999 मध्ये Zilla Parishad / Government School  Website!

PSA TECH घेऊन आले आहे शाळांसाठी खास Digital School Website Solution.

आपल्या वेबसाइटवर मिळेल —

● शाळेची संपूर्ण माहिती
● मुख्याध्यापकांचा संदेश
● शिक्षक आणि इतर सर्व स्टाफचे फोटो व नावे
● शाळेच्या सुविधा
● फोटो गॅलरी
● संपर्काची माहिती
● Google Map Location
● Mobile Friendly Website
● शाळेसाठी Unique Domain Name

● Website QR Code – QR Code Scan करून वेबसाइट सहज उघडा

महत्त्वाची माहिती एका डिजिटल प्लॅटफॉर्मवर —

● सूचना (Notice)
● परिपत्रके (Circular)
● निकाल (Result)
● वेळापत्रक (Time Table)
● अभ्यासक्रम (Syllabus)
● शाळेचे कार्यक्रम (Events)
● शिक्षकांची माहिती (Staff Information)
● महत्त्वाचे Downloads

AI Basic Training – 3 Days
AI चा वापर – सोप्या भाषेत!

● AI म्हणजे काय?
● AI Tools ची ओळख आणि वापर
● Content, Email आणि Presentation तयार करणे

आपल्या शाळेची डिजिटल ओळख निर्माण करा!

अधिक माहितीसाठी खालील लिंकला भेट द्या:
${this.productUrl}

संपर्क: 8668267967
वेबसाइट: https://psatechall.com`;

  }


  // WHATSAPP SHARE
  shareOnWhatsApp(): void {

    const message = this.getShareMessage();

    const whatsappUrl =
      'https://wa.me/?text=' +
      encodeURIComponent(message);

    window.open(
      whatsappUrl,
      '_blank'
    );

  }


  // FACEBOOK SHARE
  shareOnFacebook(): void {

    const facebookUrl =
      'https://www.facebook.com/sharer/sharer.php?u=' +
      encodeURIComponent(this.productUrl);

    window.open(
      facebookUrl,
      '_blank'
    );

  }


  // COPY COMPLETE MESSAGE
  copyLink(): void {

    const message =
      this.getShareMessage();

    navigator.clipboard
      .writeText(message)
      .then(() => {

        alert(
          'Complete school details copied successfully!'
        );

      })
      .catch(() => {

        alert(
          'Unable to copy details. Please try again.'
        );

      });

  }

}