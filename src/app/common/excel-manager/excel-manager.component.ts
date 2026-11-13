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

  private readonly STORAGE_KEY = 'psa_excel_manager_data';

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

    return this.tableData.filter(row => {

      const name = this.getNameFromRow(row).toLowerCase();

      const mobile = this.getMobileFromRow(row).toLowerCase();

      return name.includes(search) || mobile.includes(search);

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

    // Remove spaces and special characters
    let mobile = String(phone).replace(/\D/g, '');

    // Remove 0091 country code
    if (mobile.startsWith('0091')) {
      mobile = mobile.substring(4);
    }

    // Remove 91 country code
    if (mobile.startsWith('91') && mobile.length === 12) {
      mobile = mobile.substring(2);
    }

    // Add India country code for 10-digit mobile numbers
    if (mobile.length === 10) {
      mobile = '91' + mobile;
    }

    // Contact name from Excel
    const name = this.getNameFromRow(row);

    const greeting = name
      ? `Hi ${name},`
      : 'Hi,';

    // PSA TECH WhatsApp message
    const message = `${greeting}

Greetings from PSA TECH!

We provide professional Web Development, Software Development, Digital Marketing, and IT Solutions to help grow your business.

We would be happy to connect with you and discuss how PSA TECH can support your digital growth.

🌐 Website: https://www.psatechall.com

📞 Contact: +91 8668267967

Regards,
PSA TECH
Your Digital TECH Partner`;

    return `https://wa.me/${mobile}?text=${encodeURIComponent(message)}`;

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
        this.STORAGE_KEY,
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

      const savedData = localStorage.getItem(this.STORAGE_KEY);

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

    localStorage.removeItem(this.STORAGE_KEY);

  }

  // Prepare Excel / CSV export data with serial number
  getExportData(): any[] {

    return this.tableData.map((row, index) => {

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