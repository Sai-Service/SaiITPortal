import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConst } from '../../app-const';

interface UserData {
  userName: string;
  orgId: number;
  orgName: string;
  role: string;
  city: string;
}


@Component({
  selector: 'app-viewreportsall',
  templateUrl: './viewreportsall.component.html',
  styleUrl: './viewreportsall.component.css'
})
export class ViewreportsallComponent implements OnInit {
    username: string = '';
     orgId: string = '';
     orgName: string = '';
     role: string = '';
     city: string = '';
     userData: UserData | null = null;
     isCityDisabled: boolean = false;
   
     // Existing properties
     reports: any[] = [];
     currentYear: number = new Date().getFullYear();
     previousYear: number = this.currentYear - 1;
     errorMessage: string | null = null;
   
     headers: HttpHeaders;
     ServerUrl : string;
     constructor(private httpclient: HttpClient,private http: HttpClient) {
       this.headers = new HttpHeaders();
       // this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
       this.ServerUrl = AppConst.ServerUrl;
      }
   
     ngOnInit(): void {
       // Get user data from localStorage
       this.username = sessionStorage.getItem('userName') || '';
       this.orgId = (sessionStorage.getItem('orgId')) || '';
       this.orgName = sessionStorage.getItem('orgName') || '';
       this.role = sessionStorage.getItem('role') || '';
   
       // Try to get the complete user data object
       const userDataString = sessionStorage.getItem('userData');
       if (userDataString) {
         this.userData = JSON.parse(userDataString);
       }
     }
   
     // For Downloading the path of reports
     fetchReports(city: string, department: string, month: string, year: string): void {
       if (city === 'Select City' || month === 'Select Month' || year === 'Select Year') {
         alert("Please select all the information");
         return;
       } else {
         // Include orgId in the API call if needed
         const url = this.ServerUrl+`/portalReports/reportPathDetails?city=${city}&department=${department}&month=${month}&year=${year}`;
         
         this.http.get(url).subscribe({
           next: (response: any) => {
             if (response.code === 200) {
               this.reports = response.obj.map((report: any) => ({
                 week_no: report.week_no,
                 report_name: this.extractFileName(report.report_path)
               }));
               this.errorMessage = null;
             } else {
               this.reports = [];
               this.errorMessage = response.message || 'Failed to fetch data.';
             }
           },
           error: (error) => {
             this.reports = [];
             this.errorMessage = 'An error occurred while fetching the data.';
             console.error(error);
           }
         });
       }
     }
   
     // Extract file name with extension
     private extractFileName(path: string): string {
       if (!path) return '';
       return path.split('//').pop() || '';
     }
   
     // private downloadApiUrl = this.ServerUrl+`/portalReports/downPortalReport`;
     // Download report file
     downloadReport(reportName: string): void {
       // Include orgId in the download URL if needed
       const url = this.ServerUrl+`/portalReports/downPortalReport/${reportName}?orgId=${this.orgId}`;
       
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
   
     onViewReports(): void {
       // If using orgName as city, you might want to get it directly from the stored value
       const city =(document.getElementById('city') as HTMLSelectElement).value;
       const department = (document.getElementById('reportType') as HTMLSelectElement).value;
       const month = (document.getElementById('month') as HTMLSelectElement).value;
       const year = (document.getElementById('year') as HTMLSelectElement).value;
   
       if (city && department && month && year) {
         this.fetchReports(city, department, month, year);
       } else {
         this.errorMessage = 'Please select all fields.';
       }
     }

}
