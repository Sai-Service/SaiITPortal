import { Component } from '@angular/core';
import {  OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { error } from 'node:console';
import { getEnvironmentData } from 'node:worker_threads';
import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { AccountsService } from '../accounts.service';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface ACReportupload{
  ouId:number;
  locationId:number;
  deptId:number;
  filePath:string;
  month: string;
  aging:string;
  city:string;
  reportType:string;
  attribute1:number;
  attribute2:number;
  uploadType:string;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  // remark :string;
  currentYear:string;
  file:string;
}

@Component({
  selector: 'app-account-report-upload',
  templateUrl: './account-report-upload.component.html',
  styleUrl: './account-report-upload.component.css'
})

export class AccountReportUploadComponent {

    acreportuploadForm:FormGroup;
    ouId:number;
    locationId:number;
    deptId:number;
    filePath:string;
    month: string;
    reportType:string;
    uploadType:string;
    startDate:Date;
    endDate:Date;
    attribute1:number;
    attribute2:number;
    attribute3:string;
    attribute4:string;
    attribute5:string;
    // remark :string;
    city:string;
    currentYear:string;
    file:string;
    srclocationId:number;
    srcdeptId:number;
    @ViewChild('fileInput') fileInput:any;
    @ViewChild('fileInput1') fileInput1:any;
  
  public reporttypelist:any[];
  public cityList:any=[];
  public uploadtypelist:any[];
  public erplocationList:any=[];
  public logTypeList:any=[];
  public uploadFile:any=[];
  filetoupload: File | null = null
  mainimage:any=[];
  isButtonDisabled = false;
  UpdateisButtonDisabled=false;
  
    constructor(private fb: FormBuilder, private router: Router, private service: AccountsService,private http: HttpClient) {
    this. acreportuploadForm = fb.group({
    ouId:[],
    locationId:[],
    deptId:[],
    filePath:[],
    reportType:[],
    month: [],
    startDate:[],
    uploadType:[],
    endDate:[],
    attribute1:[],
    attribute2:[],
    attribute3:[],
    attribute4:[],
    attribute5:[],
    currentYear: [new Date().getFullYear().toString()], 
    file:[],
    srcdeptId:[],
    srclocationId:[],
  })
  }
  
   ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  
    this.acreportuploadForm.patchValue({
      city: sessionStorage.getItem('orgName'),
      ouId: sessionStorage.getItem('orgId'),
      currentYear: new Date().getFullYear().toString()
    });
  
    console.log('Session Data:', sessionStorage.getItem('orgName'), sessionStorage.getItem('orgId'));
    
    this.service.reporttypelist()
    .subscribe(
      data => {
        this.reporttypelist = data.obj;
        console.log(this.reporttypelist)
      }
    )
  
    this.service.uploadtypelist()
    .subscribe(
      data => {
        this.uploadtypelist = data.obj;
        console.log(this.uploadtypelist)
      }
    )

    this.service.cityList()
    .subscribe(
      data => {
        this.cityList = data.obj;
        console.log(this.cityList)
      }
    )
  }
  
  
get f() { return this. acreportuploadForm.controls; } 

 onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.filetoupload = event.target.files[0];
    }
 }


 acreportuploadfrm(acreportuploadForm: any) {
  if (this.acreportuploadForm.invalid) {
    console.warn('Form is invalid!');
    return;
  }

  const formData = new FormData();
  const formValues = this.acreportuploadForm.value;

  console.log('Form Values Before Submission:', formValues); 
  
  formData.append('ouId', formValues.ouId || '');
  formData.append('city', formValues.ouId || '');
  formData.append('reportType', formValues.reportType || '');
  formData.append('uploadType', formValues.uploadType || '');
  formData.append('month', formValues.month || '');
  formData.append('year', formValues.currentYear || new Date().getFullYear().toString());
 // formData.append('attribute5', formValues.attribute5 || '');
  formData.append('file', this.filetoupload as Blob);

  console.log('Sending Form Data:', formValues);


   this.service.uploadFile(formData).subscribe({
    next: (response) => {
      console.log('File uploaded successfully:', response);
      alert('Details uploaded successfully!');
    },
    error: (error) => {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again!');
    },
  });

 }

 transData(val :any){

  }
 
// uploadreport(){
//     const formValue = this.transData(this.acreportuploadForm.value);
//     this.acreportuploadForm.patchValue({lastUpdatedBy:'U'});
//     console.log(formValue);
//     let formData = new FormData();
//     formData.append('file', this.fileInput.nativeElement.files[0]); 
//     formData.append('objhdMst',JSON.stringify(formValue));
//     this.service.uploadFile(formData).subscribe((res: any) => {
//         if (res.code === 200) {
//           this.isButtonDisabled = true;
//           // this.showPopup = true;
//           // this.responseMessage=res.message;
//           alert('File uploaded successfully:');
//           this.acreportuploadForm.get('ouId')?.disable();
//           this.acreportuploadForm.get('city')?.disable();
//           this.acreportuploadForm.get('reportType')?.disable();
//           this.acreportuploadForm.get('uploadType')?.disable();
//           this.acreportuploadForm.get('month')?.disable();
//           this.acreportuploadForm.get('year')?.disable();
//         } 
//         if (res.code === 500) {
//          // alert(res.message);
//           // this.showPopup = true;
//           // this.responseMessage=res.message;
         
//         }
//         else {
//           if (res.code === 400) {
//             //alert(res.message);
//             // this.showPopup = true;
//             // this.responseMessage=res.message;
           
//           }
//         }
//       });
// }

 refreshForm() {
  location.reload();
 }

 private extractFileName(path: string): string {
  if (!path) return '';
  if (typeof path !== 'string') {
    console.error('Expected path to be a string but got:', typeof path);
    return ''; 
  }
  return path.split('//').pop() || ''; 
 }
}
