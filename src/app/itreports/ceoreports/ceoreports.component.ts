
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

}

interface UserData {
  userName: string;
  orgId: number;
  orgName: string;
  role:string;
  
}

@Component({
  selector: 'app-ceoreports',
  templateUrl: './ceoreports.component.html',
  styleUrl: './ceoreports.component.css'
})
export class CeoreportsComponent implements OnInit {
    
  username: string = '';
  orgId: string = '';
  orgName: string = '';
  role: string = '';
  userData: UserData | null = null;

  formData: FormData = {
    reportType: '',
    city: '',
    month: '',
    weekNo: 0,
    year: new Date().getFullYear(),
    department: '',
    ouId: '',
    createdBy: '',
    updatedBy: '',
    orgId: '',
    orgName: ''
  };
  
  file: File | null = null;

  // constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.username = localStorage.getItem('username') || '';
    this.username = sessionStorage.getItem('userName') || '';
    this.orgId = sessionStorage.getItem('orgId') || '';
    this.orgName = sessionStorage.getItem('orgName') || '';
    this.role = sessionStorage.getItem('role') || '';


    // Try to get the complete user data object
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
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
    }
  }

  headers: HttpHeaders;
  ServerUrl : string;
  constructor(private httpclient: HttpClient,private http: HttpClient) {
    this.headers = new HttpHeaders();
    // this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
    this.ServerUrl = AppConst.ServerUrl;
   }

  onSubmit(): void {
    console.log("username->"+this.username)
    if (!this.file) {
      alert('Please select a file to upload');
      console.log("orgname -->"+this.role)
      return;
    }
  
    const formData = new FormData();
    Object.entries(this.formData).forEach(([key, value]) => {
      formData.append(key, value?.toString() || '');
    });
    formData.append('excelFile', this.file);
  
    this.http.post(this.ServerUrl+`/portalReports/uploadPortalReports`, formData, { observe: 'response' })
      .subscribe(
        (response) => {
          if (response.status === 200 || response.status === 201) {
            const responseBody: any = response.body;
            if (responseBody && responseBody.message && responseBody.message.includes('already uploaded')) {
              alert(responseBody.message);
            } else {
              alert('Report uploaded successfully');
              this.resetForm();
            }
          } else {
            alert('Unexpected response from the server.');
          }
        },
        (error) => {
          console.error('Error uploading report:', error);
          const errorMessage = error?.error?.message || 'Error uploading report. Please try again.';
          alert(errorMessage);
        }
      );
  }
  
  resetForm(): void {
    this.formData = {
      reportType: '',
      city: '',
      month: '',
      weekNo: 0,
      year: new Date().getFullYear(),
      department: '',
      ouId: this.orgId, 
      createdBy: this.username,
      updatedBy: this.username,
      orgId: this.orgId,
      orgName: this.orgName
    };
    this.file = null;
  
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  updateDepartment() {
    if (this.formData.reportType === 'CEO') {
      this.formData.department = 'CEO';
    } else if (this.formData.reportType === 'Receivables') {
      this.formData.department = 'Receivables';
    } else {
      this.formData.department = ''; 
    }
  }
  
}