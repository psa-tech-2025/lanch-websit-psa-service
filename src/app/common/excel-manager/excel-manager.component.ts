import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel-manager',
  templateUrl: './excel-manager.component.html',
  styleUrls: ['./excel-manager.component.css']
})
export class ExcelManagerComponent {

  headers: string[] = [];
  tableData: any[] = [];

  fileName = '';
  errorMessage = '';
  searchText = '';

protected getStorageKey(): string {
  return 'psa_excel_manager_data';
}
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {

    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.loadFromLocalStorage();
    }

  }

  // Search by name or mobile number
get filteredData(): any[] {
  const search = this.searchText.trim().toLowerCase();

  if (!search) {
    return this.tableData;
  }

  // Find Name column dynamically
  const nameHeader = this.headers.find(header => {
    const normalized = header
      .toLowerCase()
      .replace(/[\s_-]/g, '');

    return [
      'name',
      'firstname',
      'fullname',
      'customername',
      'clientname',
      'studentname',
      'farmername',
      'personname',
      'contactname',
      'नाव',
      'पूर्णनाव'
    ].includes(normalized);
  });

  if (!nameHeader) {
    return [];
  }

  return this.tableData.filter(row => {
    const name = String(row[nameHeader] || '')
      .trim()
      .toLowerCase();

    // Match only names STARTING with entered text
    return name.startsWith(search);
  });
}

  // Upload Excel or CSV
  onFileChange(event: Event): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.fileName = file.name;
    this.errorMessage = '';
    this.searchText = '';

    const reader = new FileReader();

    reader.onload = (e: any) => {

      try {

        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
          type: 'array'
        });

        if (!workbook.SheetNames.length) {

          this.errorMessage = 'No worksheet found.';
          return;

        }

        // Read first worksheet
        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        // Convert worksheet to JSON
        const rows: any[] = XLSX.utils.sheet_to_json(
          worksheet,
          { defval: '' }
        );

        if (!rows.length) {

          this.headers = [];
          this.tableData = [];

          this.errorMessage = 'Excel file is empty.';

          return;

        }

        // Store uploaded rows
        this.tableData = rows;

        // Get Excel headers
        this.headers = Object.keys(rows[0]);

        // Find Address column
        const addressHeader = this.headers.find(header =>
          this.isAddressColumn(header)
        );

        if (!addressHeader) {

          // Add Address column if missing
          this.headers.push('Address');

          this.tableData.forEach(row => {
            row['Address'] = '';
          });

        } else {

          // Move Address column to last position
          this.headers = this.headers.filter(
            header => header !== addressHeader
          );

          this.headers.push(addressHeader);

        }

        // Save uploaded data
        this.saveToLocalStorage();

      } catch (error) {

        console.error('Excel import error:', error);

        this.errorMessage =
          'Unable to read this file. Please upload a valid Excel or CSV file.';

      }

    };

    reader.readAsArrayBuffer(file);

  }

  // Detect Address column
  isAddressColumn(header: string): boolean {

    const columnName = header
      .toLowerCase()
      .replace(/[\s_-]/g, '');

    return (
      columnName === 'address' ||
      columnName === 'fulladdress' ||
      columnName === 'contactaddress' ||
      columnName === 'homeaddress' ||
      columnName === 'permanentaddress' ||
      columnName === 'पत्ता' ||
      columnName === 'पूर्णपत्ता'
    );

  }

  // Detect Mobile column
  // IMPORTANT: Keep only one implementation of this method
  isMobileColumn(header: string): boolean {

    const columnName = header
      .toLowerCase()
      .replace(/[\s_-]/g, '');

    return (
      columnName.includes('mobile') ||
      columnName.includes('phone') ||
      columnName.includes('whatsapp') ||
      columnName.includes('contactnumber') ||
      columnName.includes('contactno') ||
      columnName.includes('मोबाईल') ||
      columnName.includes('मोबाइल') ||
      columnName.includes('फोन')
    );

  }

  // Get contact name dynamically
  getNameFromRow(row: any): string {

    const nameColumns = [
      'name',
      'fullname',
      'customername',
      'clientname',
      'studentname',
      'farmername',
      'personname',
      'contactname',
      'firstname',
      'नाव',
      'पूर्णनाव',
      'शेतकऱ्यांचेनाव'
    ];

    for (const key of Object.keys(row)) {

      const normalizedKey = key
        .toLowerCase()
        .replace(/[\s_-]/g, '');

      if (nameColumns.includes(normalizedKey)) {

        const value = String(row[key] || '').trim();

        if (value) {
          return value;
        }

      }

    }

    // Fallback: first Excel column
    if (this.headers.length > 0) {

      const firstColumn = this.headers[0];

      // Avoid using a mobile number as the name
      if (!this.isMobileColumn(firstColumn)) {

        const firstValue = String(row[firstColumn] || '').trim();

        if (firstValue) {
          return firstValue;
        }

      }

    }

    return '';

  }

  // Get mobile number dynamically
  getMobileFromRow(row: any): string {

    const mobileHeader = this.headers.find(header =>
      this.isMobileColumn(header)
    );

    if (!mobileHeader) {
      return '';
    }

    return String(row[mobileHeader] || '').trim();

  }

  // Generate WhatsApp link with PSA TECH greeting




getWhatsAppLink(phone: any, row: any): string {

  if (!phone) {
    return '';
  }

  // Normalize mobile number
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

  // Validate mobile number
  if (mobile.length !== 12 || !mobile.startsWith('91')) {
    return '';
  }

  // Get contact name from Excel
  const name = this.getNameFromRow(row);

  // Generate emojis using Unicode code points
  const emoji = (...codes: number[]) =>
    String.fromCodePoint(...codes);

  const greeting = name
    ? ` *Hello ${name} Sir!*`
    : ` *Hello Sir!*`;

  // Emoji variables
  const sparkle = emoji(0x2728);
  const bullet = emoji(0x1F539);
  const target = emoji(0x1F3AF);
  const phoneIcon = emoji(0x1F4DE);
  const globe = emoji(0x1F310);

  // Professional English WhatsApp Message
  const message = [
    greeting,
    '',
    'We provide innovative, reliable, and affordable digital and technology solutions to help businesses grow.',
    '',
    `${sparkle} *Our Key Services:*`,
    `${bullet} Website & Application Development`,
    `${bullet} Digital Marketing & Business Promotion`,
    `${bullet} AI Solutions & Business Automation`,
    `${bullet} Industrial & Business Technology Solutions`,
    `${bullet} Online Services, Professional Training & Career Development`,
    '',
    `${target} Our mission is to empower businesses with new growth opportunities through modern technology and smart digital solutions.`,
    '',
    ` *${phoneIcon} We would be delighted to have a brief phone discussion with you. Kindly share a convenient day and time when I can call you.*`,
    '',
    '',
    '*Founder – Mr. Shailesh Pawar*',
    `${globe} https://www.psatechall.com`,
    `${phoneIcon} +91 8668267967`
  ].join('\n');



  const whatsappUrl =
    `https://api.whatsapp.com/send/?phone=${mobile}&text=${encodeURIComponent(message)}`;

  console.log('English WhatsApp URL:', whatsappUrl);

  return whatsappUrl;
}




getWhatsAppLinkMarathi(phone: any, row: any): string {

  if (!phone) {
    return '';
  }

  // Normalize mobile number
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

  // Validate mobile number
  if (mobile.length !== 12 || !mobile.startsWith('91')) {
    return '';
  }

  // Get contact name from Excel
  const name = this.getNameFromRow(row);

  // Generate emojis using Unicode code points
  const emoji = (...codes: number[]) =>
    String.fromCodePoint(...codes);

  const greeting = name
    ? ` *नमस्कार ${name} Sir!*`
    : ` *नमस्कार Sir!*`;

  // Emoji variables
  const building = emoji(0x1F3E2);
  const sparkle = emoji(0x2728);
  const bullet = emoji(0x1F539);
  const target = emoji(0x1F3AF);
  const phoneIcon = emoji(0x1F4DE);
  const globe = emoji(0x1F310);

  // Professional Marathi WhatsApp Message
  const message = [
    greeting,
    '',
    'व्यवसायासाठी आम्ही नाविन्यपूर्ण, विश्वासार्ह आणि किफायतशीर डिजिटल व तंत्रज्ञानविषयक सेवा प्रदान करतो.',
    '',
    `${sparkle} *आमच्या प्रमुख सेवा:*`,
    `${bullet} वेबसाइट आणि ॲप्लिकेशन डेव्हलपमेंट`,
    `${bullet} डिजिटल मार्केटिंग आणि व्यवसायाची जाहिरात`,
    `${bullet} AI सोल्युशन्स आणि व्यवसाय ऑटोमेशन`,
    `${bullet} औद्योगिक आणि व्यावसायिक तंत्रज्ञान सेवा`,
    `${bullet} ऑनलाइन सेवा, व्यावसायिक प्रशिक्षण आणि करिअर मार्गदर्शन`,
    '',
    `${target} आधुनिक तंत्रज्ञान आणि स्मार्ट डिजिटल सोल्युशन्सच्या माध्यमातून व्यवसायांना प्रगतीच्या नव्या संधी उपलब्ध करून देणे हे आमचे ध्येय आहे.`,

    ` *${phoneIcon} आपल्याशी थोडक्यात फोनवर चर्चा करण्यास आम्हाला आनंद होईल. आपणास फोन करण्यासाठी कृपया आपल्या सोयीचा दिवस आणि वेळ कळवावा.*`,
      '',
      '',
    ' *संस्थापक श्री. शैलेश पवार* ',
  
    `${globe} https://www.psatechall.com`,
    `${phoneIcon} +91 8668267967`
  ].join('\n');

  // Debug before opening WhatsApp
  console.log('Marathi WhatsApp Message:', message);
  console.log(
    'Replacement character found:',
    message.includes('\uFFFD')
  );

  const whatsappUrl =
    `https://api.whatsapp.com/send/?phone=${mobile}&text=${encodeURIComponent(message)}`;

  console.log('Marathi WhatsApp URL:', whatsappUrl);

  return whatsappUrl;
}



  // Save uploaded data in LocalStorage
  saveToLocalStorage(): void {

    if (!this.isBrowser) {
      return;
    }

    try {

      const data = {
        headers: this.headers,
        tableData: this.tableData,
        fileName: this.fileName
      };

      localStorage.setItem(
  this.getStorageKey(),
  JSON.stringify(data)
);

    } catch (error) {

      console.error('LocalStorage save error:', error);

      this.errorMessage =
        'Unable to save data. Browser storage may be full.';

    }

  }

  // Restore saved data after refresh
  loadFromLocalStorage(): void {

    if (!this.isBrowser) {
      return;
    }

    try {

     const savedData = localStorage.getItem(
  this.getStorageKey()
);

      if (!savedData) {
        return;
      }

      const data = JSON.parse(savedData);

      this.headers = data.headers || [];
      this.tableData = data.tableData || [];
      this.fileName = data.fileName || '';

    } catch (error) {

      console.error('LocalStorage restore error:', error);

      this.clearLocalStorage();

    }

  }

  // Remove saved data from LocalStorage
  clearLocalStorage(): void {

    if (!this.isBrowser) {
      return;
    }

  localStorage.removeItem(this.getStorageKey());

  }

  // Prepare Excel / CSV export data with serial number
// Export only currently filtered records
getExportData(): any[] {

  return this.filteredData.map((row, index) => {

    const exportRow: any = {
      'Sr. No.': index + 1
    };

    this.headers.forEach(header => {

      exportRow[header] = row[header] ?? '';

    });

    return exportRow;

  });

}

  // Download Excel
  exportExcel(): void {

    if (!this.tableData.length) {
      return;
    }

    const exportData = this.getExportData();

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Data'
    );

    XLSX.writeFile(
      workbook,
      'exported-data.xlsx'
    );

  }

  // Download CSV
  exportCSV(): void {

    if (!this.tableData.length) {
      return;
    }

    const exportData = this.getExportData();

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob(
      ['\uFEFF' + csv],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;
    link.download = 'exported-data.csv';

    link.click();

    URL.revokeObjectURL(url);

  }

  // Clear table and LocalStorage
  clearData(): void {

    this.headers = [];
    this.tableData = [];
    this.fileName = '';
    this.errorMessage = '';
    this.searchText = '';

    this.clearLocalStorage();

  }

}