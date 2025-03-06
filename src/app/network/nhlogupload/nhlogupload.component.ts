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
  http: any;

  constructor(private fb: FormBuilder, private router: Router, private service: NetworkService) {
    this. nhloguploadForm = fb.group({
  ouId:[],
  locationId:[],
  deptId:[],
  filePath:[],
  logType:[],
  startDate:[],
  endDate:[],
  attribute1:[],
  attribute2:[],
  attribute3:[],
  attribute4:[],
  attribute5:[],
  // remark :[],
  currentYear:[],
  file:[],
  srcdeptId:[],
  srclocationId:[],
})
}


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this. nhloguploadForm.patchValue({attribute5:sessionStorage.getItem('orgName')});
    this. nhloguploadForm.patchValue({ouId:sessionStorage.getItem('orgId')});

   
  alert(sessionStorage.getItem('orgId'))

    this.service.erplocationList(sessionStorage.getItem('orgId'))
    .subscribe( 
      data => { 
        this.erplocationList = data.obj;
        console.log(this.erplocationList);
      }
    )


    this.service.logTypeList()
    .subscribe( 
      data => {
        this.logTypeList = data.obj;
        console.log(this.logTypeList);
      }
    )
    


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
      return;
    }

    const formData = new FormData();
    formData.append('ouId', this.nhloguploadForm.get('ouId')?.value);
    formData.append('locationId', this.nhloguploadForm.get('locationId')?.value);
    formData.append('logType', this.nhloguploadForm.get('logType')?.value);
    formData.append('file', this.filetoupload as Blob);
    
    // formData.append('attribute1', this.nhloguploadForm.get('attribute1')?.value);
    // formData.append('attribute2', this.nhloguploadForm.get('attribute2')?.value);
    // formData.append('attribute3', this.nhloguploadForm.get('attribute3')?.value);

  
    this.http.post(' http://localhost:8080/nhReports/uploadNhReports', formData).subscribe((response: any) => {
      console.log('File uploaded successfully', response);
    }, (error: any) => {
      console.error('Error uploading file', error);
    });
 }




  // uploadFile(){
  //   this.uploadnhreport.File(this.filetoupload).subscribe((data: any) => {
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

    

}
