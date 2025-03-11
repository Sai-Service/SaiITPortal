import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConst } from '../../app-const';

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

  constructor(private http: HttpClient) {
    this.ServerUrl = AppConst.ServerUrl;
  }


  fetchReports(city: string): void {
    if (city === 'Select City') {
      alert('Please select a valid city.');
      return;
    }
  
    const url = `${this.ServerUrl}/portalDataReports/dataReportPath?reportRelatedTo=${city}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.reportTypes = response.obj.map((report: any) => report.REPORT_TYPE);
  
          this.reports = response.obj
            .filter((report: any) => report.REPORT_PATH) 
            .map((report: any) => ({
              fileName: this.extractFileName(report.REPORT_PATH),
              fullPath: report.REPORT_PATH, 
            }));
  
          this.errorMessage = null;
        } else {
          this.reportTypes = [];
          this.reports = [];
          this.errorMessage = response.message || 'No reports found.';
        }
      },
      error: () => {
        this.reportTypes = [];
        this.reports = [];
        this.errorMessage = 'An error occurred while fetching the reports.';
      },
    });
  }
  

  onViewReports(): void {
    const city =(document.getElementById('city') as HTMLSelectElement).value;
    if (city) {
      this.fetchReports(city);
    } else {
      this.errorMessage = 'Please select all fields.';
    }
  }


  private extractFileName(path: string): string {
    if (!path) return '';
    return path.split('//').pop() || '';
  }

  downloadReport(reportName: string): void {
    const url = this.ServerUrl+`/portalDataReports/downloadDataReports/${reportName}`;
    console.log("url---->"+url)
    
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = reportName;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (error) => {
        console.error('Download failed:', error);
        this.errorMessage = 'Failed to download the report. Please try again.';
      }
    });
  }
  

}