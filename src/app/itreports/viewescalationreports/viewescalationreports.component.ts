import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConst } from '../../app-const';

interface FormData {
  reportType: string;
  city: string;
  month: string;
  weekNo: number;
  year: number;
  department: string;
  ouId: string;
  createdBy: string;
  updatedBy: string;
  orgId: string;
  orgName?: string;
  role?: string;
  REPORT_TYPE:string;
}

@Component({
  selector: 'app-viewescalationreports',
  templateUrl: './viewescalationreports.component.html',
  styleUrl: './viewescalationreports.component.css'
})
export class ViewescalationreportsComponent {
  reports: any[] = [];
  reportTypes: string[] = [];
  errorMessage: string | null = null;
  ServerUrl: string;
  REPORT_TYPE:string;

  userName: string = ''; 
  orgId: number = 0;    
  orgName: string = '';  
  role: string = '';
  formData: any;

  // reports: any[] = [];
  // errorMessage: string | null = null;

  reportRelations:any[] ; // Main report types
  subTypes: any[] ;        // Upload types (subtypes)

  selectedReportType: string = '';
  selectedUploadType: string = '';
  selectedMonth: string = '';

  selectedYear: number | null = null;
  yearOptions: number[] = [];
  
  // showQuarter: boolean = false; 

  // ServerUrl: string;


  constructor(private http: HttpClient) {
    this.ServerUrl = AppConst.ServerUrl;
  }

  ngOnInit() {
    const storedUsername = sessionStorage.getItem('userName');
    const storedOrgId = sessionStorage.getItem('orgId');
    const storedOrgName = sessionStorage.getItem('orgName');
    const storedRole = sessionStorage.getItem('role');


    this.userName = storedUsername || '';
    this.orgId = storedOrgId ? Number(storedOrgId) : 0;
    this.orgName = storedOrgName || '';
    this.role = storedRole || '';

    this.fetchMainReportRelations();
    this.generateYearOptions();

  }

  generateYearOptions(): void {
  const currentYear = new Date().getFullYear();
  this.yearOptions = [currentYear - 1, currentYear, currentYear + 1]; // You can change the range as needed
}

  fetchMainReportRelations(): void {

    this.http.get<any>(`${this.ServerUrl}/portalDataReports/reportRelation`).subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.reportRelations = response.obj; // Adjust if structure differs
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load report types.';
      }
    });
   
  }

  onReportTypeChange(): void {
  const reportRelatedTo = this.selectedReportType;

  this.selectedUploadType = '';  // Reset sub-type
  this.subTypes = [];

  if (!reportRelatedTo) {
    return;
  }

  const apiUrl = `${this.ServerUrl}/portalDataReports/dataReportType?reportRelatedTo=${reportRelatedTo}`;
  this.http.get<any>(apiUrl).subscribe({
    next: (res) => {
      if (res.code === 200) {
        this.subTypes = res.obj;
      } else {
        this.subTypes = [];
      }
    },
    error: () => {
      this.subTypes = [];
    }
  });
}

  fetchReportTypes(): void {
    const accessTo = encodeURIComponent(this.formData.accessTo);
    const reportRelatedTo =encodeURIComponent(this.formData.reportRelatedTo)
    const apiUrl = `${this.ServerUrl}/portalDataReports/dataReportType?reportRelatedTo=${reportRelatedTo}`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (response.code === 200 && Array.isArray(response.obj)) {
          this.reportTypes = response.obj;
          console.log('Fetched Report Types:', this.reportTypes);
        } else {
          this.reportTypes = [];
          console.warn('Unexpected API Response:', response);
        }
      },
      (error) => {
        console.error('Error fetching report types:', error);
        this.reportTypes = [];
      }
    );
  }

onViewReports(): void {
  const month = (document.getElementById('month') as HTMLSelectElement).value;

  if (!this.selectedReportType || !this.selectedUploadType || !month || !this.selectedYear) {
    this.errorMessage = 'Please select report type, upload type, month, and year.';
    return;
  }

  this.fetchReports(this.selectedUploadType, month, this.selectedYear);
}


  fetchReports(uploadType: string, month: string, year: number): void {
  const url = `${this.ServerUrl}/portalDataReports/dataReportPath?reportType=${uploadType}&month=${month}&year=${year}`;

  this.http.get<any>(url).subscribe({
    next: (response) => {
      if (response.code === 200) {
        let allReports = response.obj
          .filter((report: any) => report.REPORT_PATH)
          .map((report: any) => ({
            fileName: this.extractFileName(report.REPORT_PATH),
            fullPath: report.REPORT_PATH,
            month: report.MONTH || 'N/A'
          }));

        this.reports = allReports;
        this.errorMessage = this.reports.length === 0 ? 'No reports found for the selected month.' : null;
      } else {
        this.reports = [];
        this.errorMessage = response.message || 'No reports found.';
      }
    },
    error: () => {
      this.reports = [];
      this.errorMessage = 'An error occurred while fetching the reports.';
    }
  });
}

  private extractFileName(path: string): string {
    return path?.split('//').pop() || '';
  }

  downloadReport(reportName: string): void {
    const url = `${this.ServerUrl}/portalDataReports/downloadDataReports/${reportName}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = reportName;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: () => {
        this.errorMessage = 'Failed to download the report.';
      }
    });
  }
}
  

