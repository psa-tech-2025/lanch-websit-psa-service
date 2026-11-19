
import { Component, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { ExcelManagerComponent } from '../excel-manager/excel-manager.component';

@Component({
  selector: 'app-grampanchayat-contact',
  templateUrl: './grampanchayat-contact.component.html',
  styleUrls: ['./grampanchayat-contact.component.css']
})
export class GrampanchayatContactComponent extends ExcelManagerComponent {

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    super(platformId);
  }

  // Separate LocalStorage for Gram Panchayat contacts
  protected override getStorageKey(): string {
    return 'psa_grampanchayat_contact_data';
  }

  // Also recognize a column named Contact
  override isMobileColumn(header: string): boolean {
    const normalized = header
      .toLowerCase()
      .replace(/[\s_-]/g, '');

    return super.isMobileColumn(header) ||
      normalized === 'contact' ||
      normalized === 'mobileno' ||
      normalized === 'contactmobile';
  }

  // English Gram Panchayat WhatsApp message
  override getWhatsAppLink(phone: any, row: any): string {

    if (!phone) {
      return '';
    }

    let mobile = String(phone).replace(/\D/g, '');

    if (mobile.startsWith('0091')) {
      mobile = mobile.substring(4);
    }

    if (mobile.startsWith('91') && mobile.length === 12) {
      mobile = mobile.substring(2);
    }

    if (mobile.length === 10) {
      mobile = '91' + mobile;
    }

    if (mobile.length !== 12 || !mobile.startsWith('91')) {
      return '';
    }

    const name = this.getNameFromRow(row);

    const message = [
      `Hello ${name || 'Sir/Madam'}!`,
      '',
      'Greetings from PSA TECH – Your Digital TECH Partner!',
      '',
      'We provide professional website development and digital solutions for Gram Panchayats across Maharashtra.',
      '',
      'Our services include:',
      '🔹 Gram Panchayat Official Website Development',
      '🔹 Government Schemes and Yojana Information',
      '🔹 Online Forms and Citizen Services',
      '🔹 Online Applications and QR Code Solutions',
      '🔹 Notices, Events and Public Information',
      '🔹 Website Maintenance and Technical Support',
      '',
      'Our objective is to help Gram Panchayats improve digital accessibility, transparency and communication with citizens.',
      '',
      'Would you be available for a brief discussion? Kindly share a convenient day and time for a call.',
      '',
      'PSA TECH – Your Digital TECH Partner',
      'Founder – Mr. Shailesh Pawar',
      'Website: https://www.psatechall.com',
      'Contact: +91 8668267967'
    ].join('\n');

    return `https://api.whatsapp.com/send/?phone=${mobile}&text=${encodeURIComponent(message)}`;
  }

  // Marathi Gram Panchayat WhatsApp message
  override getWhatsAppLinkMarathi(phone: any, row: any): string {

    if (!phone) {
      return '';
    }

    let mobile = String(phone).replace(/\D/g, '');

    if (mobile.startsWith('0091')) {
      mobile = mobile.substring(4);
    }

    if (mobile.startsWith('91') && mobile.length === 12) {
      mobile = mobile.substring(2);
    }

    if (mobile.length === 10) {
      mobile = '91' + mobile;
    }

    if (mobile.length !== 12 || !mobile.startsWith('91')) {
      return '';
    }

    const name = this.getNameFromRow(row);

    const message = [
      `*नमस्कार ${name } 'सर'!*`,
      '',
      'मुख्यमंत्री समृद्ध पंचायतराज अभियानांतर्गत',
      '',
      ' ग्रामपंचायतींसाठी आम्ही  वेबसाइट डेव्हलपमेंट आणि डिजिटल सेवा उपलब्ध करून देत आहोत.',
      '',
      'आमच्या प्रमुख सेवा:',
      '🔹 ग्रामपंचायतीची अधिकृत वेबसाइट तयार करणे',
      '🔹 शासकीय योजना व योजनांची माहिती ऑनलाइन उपलब्ध करणे',
      '🔹 ऑनलाइन फॉर्म आणि नागरिक सेवा',
      '🔹 ऑनलाइन अर्ज आणि QR कोड सोल्युशन्स',
      '🔹 वेबसाइट मेंटेनन्स आणि तांत्रिक सहाय्य',
      '',
      'ग्रामपंचायतीचे कामकाज अधिक डिजिटल, आणि नागरिकांसाठी सुलभ करण्याचा आमचा प्रयत्न आहे.',
      '',
      '*याबाबत थोडक्यात चर्चा करण्यासाठी आपणास कोणत्या दिवशी आणि किती वाजता फोन करणे सोयीचे राहील?*',
      '',
      'PSA TECH – Your Digital TECH Partner',
      'संस्थापक – श्री. शैलेश पवार',
      'वेबसाइट: https://www.psatechall.com/gram-panchayat-website',
      'संपर्क: +91 8668267967'
    ].join('\n');

    return `https://api.whatsapp.com/send/?phone=${mobile}&text=${encodeURIComponent(message)}`;
  }
}
