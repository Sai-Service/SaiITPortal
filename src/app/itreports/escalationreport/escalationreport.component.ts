import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../app-const';

interface FormData {
  accessTo: string;
  city: string;
  month: string;
  reportType: string;
  year: number;
  department: string;
  ouId: string;
  createdBy: string;
  updatedBy: string;
  orgId: string;
  orgName?: string;
  role?: string;
  
}

interface ReportType {
  REPORT_TYPE: string;
  ACCESS_TO: string;
}

interface UserData {
  userName: string;
  orgId: number;
  orgName: string;
  role: string;
}

@Component({
  selector: 'app-escalationreport',
  templateUrl: './escalationreport.component.html',
  styleUrl: './escalationreport.component.css',
})
export class EscalationreportComponent implements OnInit {
  isCityDisabled: boolean = false;
  username: string = '';
  orgId: string = '';
  orgName: string = '';
  role: string = '';
  year: string='';
  currentYear:string;
  userData: UserData | null = null;

  formData: FormData = {
    accessTo: '',
    city: '',
    month: '',
    reportType: '',
    year: new Date().getFullYear(),
    department: '',
    ouId: '',
    createdBy: '',
    updatedBy: '',
    orgId: '',
    orgName: '',
    role: '',
  };

  file: File | null = null;

  reportTypes: ReportType[] = [];

  headers: HttpHeaders;
  ServerUrl: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.ServerUrl = AppConst.ServerUrl;
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('userName') || '';
    this.orgId = sessionStorage.getItem('orgId') || '';
    this.orgName = sessionStorage.getItem('orgName') || '';
    this.role = sessionStorage.getItem('role') || '';

    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    }

    this.formData.createdBy = this.username;
    this.formData.updatedBy = this.username;
    this.formData.orgId = this.orgId;
    this.formData.orgName = this.orgName;
    this.formData.ouId = this.orgId;
    this.formData.role = this.role;
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files?.length) {
      this.file = element.files[0];
      console.log('File Selected:', this.file);
    }
  }

  onSubmit(): void {
    console.log('Submitting Form:', this.formData);

    if (!this.file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();

    Object.entries(this.formData).forEach(([key, value]) => {
      formData.append(key, value?.toString() || '');
    });

    formData.append('file', this.file);

    this.http
      .post(this.ServerUrl + `/portalDataReports/uploadDataReports`, formData, {
        observe: 'response',
      })
      .subscribe(
        (response) => {
          if (response.status === 200 || response.status === 201) {
            const responseBody: any = response.body;

            if (
              responseBody &&
              responseBody.message &&
              responseBody.message.includes('already uploaded')
            ) {
              alert(responseBody.message);
            } else {
              alert('Report uploaded successfully.');
              this.resetForm();
            }
          } else {
            alert('Unexpected response from the server.');
          }
        },
        (error) => {
          console.error('Error uploading report:', error);
          alert(error?.error?.message || 'Error uploading report. Please try again.');
        }
      );
  }

  resetForm(): void {
    this.formData = {
      accessTo: '',
      city: '',
      month: '',
      reportType: '',
      year: new Date().getFullYear(),
      department: '',
      ouId: this.orgId,
      createdBy: this.username,
      updatedBy: this.username,
      orgId: this.orgId,
      orgName: this.orgName,
      role: this.role,
      
    };

    this.file = null; 

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    this.reportTypes = []; 
  }

  updateDepartment(): void {
    console.log('Selected Report Type:', this.formData.accessTo);

    this.isCityDisabled = this.formData.accessTo === 'TOP MGT';
    if (this.isCityDisabled) {
      this.formData.city = 'ALL';
    }

    this.fetchReportTypes();
  }

  fetchReportTypes(): void {
    const accessTo = encodeURIComponent(this.formData.accessTo);
    const apiUrl = `${this.ServerUrl}/portalDataReports/dataReportType?accessTo=${accessTo}`;

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
}
