import { Component } from '@angular/core';
import {  OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NetworkService } from '../network.service';
import { error } from 'node:console';
import { getEnvironmentData } from 'node:worker_threads';
import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};


interface nhlogupload{
  ouId:number;
  locationId:number;
  deptId:number;
  filePath:string;
  month: string;
  aging:string;
  logType:string;
  attribute1:number;
  attribute2:number;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  // remark :string;
  currentYear:string;
  file:string;
}

@Component({
  selector: 'app-nhlogupload',
  templateUrl: './nhlogupload.component.html',
  styleUrl: './nhlogupload.component.css'
})
export class NhloguploadComponent {
  nhloguploadForm:FormGroup;
  ouId:number;
  locationId:number;
  deptId:number;
  filePath:string;
  month: string;
  logType:string;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:number;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  // remark :string;
  currentYear:string;
  file:string;
  srclocationId:number;
  srcdeptId:number;
  @ViewChild('fileInput') fileInput:any;
  @ViewChild('fileInput1') fileInput1:any;


public erplocationList:any=[];
public logTypeList:any=[];
public uploadFile:any=[];
filetoupload: File | null = null
mainimage:any=[];
// viewAllDoucmnet:any;
isButtonDisabled = false;
UpdateisButtonDisabled=false;
  nhteamreportsearch: any;

  constructor(private fb: FormBuilder, private router: Router, private service: NetworkService,private http: HttpClient) {
    this. nhloguploadForm = fb.group({
  ouId:[],
  locationId:[],
  deptId:[],
  filePath:[],
  logType:[],
  month: [],
  startDate:[],
  endDate:[],
  attribute1:[],
  attribute2:[],
  attribute3:[],
  attribute4:[],
  attribute5:[],
  // remark :[],
  // currentYear:[],
  currentYear: [new Date().getFullYear().toString()], 
  file:[],
  srcdeptId:[],
  srclocationId:[],
})
}


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  
    this.nhloguploadForm.patchValue({
      attribute5: sessionStorage.getItem('orgName'),
      ouId: sessionStorage.getItem('orgId'),
      currentYear: new Date().getFullYear().toString()
    });
  
    console.log('Session Data:', sessionStorage.getItem('orgName'), sessionStorage.getItem('orgId'));
  
    // Fetch ERP locations
    this.service.erplocationList(sessionStorage.getItem('orgId')).subscribe(
      (data) => {
        this.erplocationList = data.obj;
        console.log('Location List:', this.erplocationList);
      },
      (error) => console.error('Error fetching locations:', error)
    );
  
    // Fetch log types
    this.service.logTypeList().subscribe(
      (data) => {
        this.logTypeList = data.obj;
        console.log('Log Type List:', this.logTypeList);
      },
      (error) => console.error('Error fetching log types:', error)
    );
  }
  
  
  get f() { return this. nhloguploadForm.controls; }
  // nhloguploadfrm( nhloguploadForm: any) { }
 

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.filetoupload = event.target.files[0];
    }
  }


nhloguploadfrm(nhloguploadForm: any) {
  if (this.nhloguploadForm.invalid) {
    console.warn('Form is invalid!');
    return;
  }

  const formData = new FormData();
  const formValues = this.nhloguploadForm.value;

  console.log('Form Values Before Submission:', formValues); 
  
  formData.append('ouId', formValues.ouId || '');
  formData.append('locationId', formValues.locationId || '');
  formData.append('city', formValues.attribute5 || '');
  formData.append('reportType', formValues.logType || '');
  formData.append('month', formValues.month || '');
  formData.append('year', formValues.currentYear || new Date().getFullYear().toString());
  formData.append('attribute5', formValues.attribute5 || '');
  formData.append('excelFile', this.filetoupload as Blob);

  console.log('Sending Form Data:', formValues);


  
  // this.http.post('http://localhost:8080/nhReports/uploadNhReports', formData)
  //   .subscribe({
  //     next: (response) => console.log('File uploaded successfully:', response),
  //     error: (error) => console.error('Error uploading file:', error),
  //   });

  this.http.post('http://localhost:8080/nhReports/uploadNhReports', formData)
    .subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        // Show alert on successful upload
        alert('Details uploaded successfully!');
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        // Show alert on error
        alert('Error uploading file. Please try again!');
      },
    });

}


 
 refreshForm() {
  location.reload();
}

search() {
  const city = (document.getElementById('city') as HTMLSelectElement).value;
  alert("city-"+city);
  const year = (document.getElementById('year') as HTMLSelectElement).value;
  const logType = (document.getElementById('logType') as HTMLSelectElement).value;
  const month = (document.getElementById('month') as HTMLSelectElement).value;

  this.service.nhREportSearch(city, logType, month, year)
    .subscribe(
      (res: any) => {
        if (res.code == 200) {
          alert(res.message);
          
          this.nhteamreportsearch = res.obj;

          if (Array.isArray(res.obj) && res.obj.length > 0) {
            const reportPath = res.obj[0].report_path; 
            if (typeof reportPath === 'string') {
               const fileName = this.extractFileName(reportPath);
              console.log('Extracted file name: ', fileName);  // For debugging purposes, or you can use it elsewhere
            } else {
              console.error('Expected report_path to be a string, but got:', typeof reportPath);
            }
          } 
          else {
            console.error('Expected res.obj to be a non-empty array.');
          }
        } else {
          // Handle the case when the response code is not 200
        }
      },
      (error: any) => {
        // Handle any errors that occur during the HTTP request
        console.error('Error occurred: ', error);
      }
    );
}

// Your extractFileName function
private extractFileName(path: string): string {
  if (!path) return '';
  if (typeof path !== 'string') {
    console.error('Expected path to be a string but got:', typeof path);
    return '';  // Return an empty string if path isn't a string
  }
  return path.split('//').pop() || '';  // Extract the file name from the path
}


}
