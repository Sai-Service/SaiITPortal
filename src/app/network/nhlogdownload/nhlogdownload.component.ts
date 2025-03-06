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
import { data } from 'jquery';

const MIME_TYPES :any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface uerissueslog{
  ouId:number;
  locationId:number;
  filePath:string;
  logType:string;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:number;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  remark :string;
  currentYear:string;
  file:string;
  assignedTo:string;
  city:string;
}


@Component({
  selector: 'app-nhlogdownload',
  templateUrl: './nhlogdownload.component.html',
  styleUrl: './nhlogdownload.component.css'
})
export class NhlogdownloadComponent {
 nhlogdownloadForm:FormGroup;
  ouId:number;
  locationId:number;
  filePath:string;
  logType:string;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:number;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  remark :string;
  currentYear:string;
  file:string;
  srcitexecutive:string;
  srcstatus:string;
  srclocationId:number;
  srcdeptId:number;

  @ViewChild('fileInput') fileInput:any;


  public erplocationList:any=[];
  public alllocationlist:any=[];
  public cityList:any=[];
  public logTypeList:any=[];
    mainimage:any=[];
    viewAllDoucmnet:any;
    isButtonDisabled = false;
  ServerUrl: string;
  http: any;
  reports: any;
  errorMessage: null;
  orgId: any;
  
  
  
    constructor(private fb: FormBuilder, private router: Router, private service: NetworkService) {
      this.nhlogdownloadForm = fb.group({
    ouId:[],
    locationId:[],
    filePath:[],
    logType:[],
    startDate:[],
    endDate:[],
    attribute1:[],
    attribute2:[],
    attribute3:[],
    attribute4:[],
    attribute5:[],

    currentYear:[],
    file:[],
    srcitexecutive:[],
    srcstatus:[],
    srcdeptId:[],
    srclocationId:[],
    lastUpdatedBy:[],
  })
  }
   

    ngOnInit(): void {
      $("#wrapper").toggleClass("toggled");
      this.nhlogdownloadForm.patchValue({createdBy:sessionStorage.getItem('orgID')});
      var  logType = this.nhlogdownloadForm.get('logType')?.value;
      if(logType === null){
        this.nhlogdownloadForm.patchValue({logType:'none'});
      }
  
       
      this.service.erplocationList(sessionStorage.getItem('orgId'))
    .subscribe( 
      data => { 
        this.erplocationList = data.obj;
        console.log(this.erplocationList);
      }
    )

    this.service.alllocationlist()
    .subscribe( 
      data => { 
        this.alllocationlist = data.obj;
        console.log(this.alllocationlist);
      }
    )

    this.service.logTypeList()
    .subscribe( 
      data => {
        this.logTypeList = data.obj;
        console.log(this.logTypeList);
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
  get f() { return this.nhlogdownloadForm.controls; }
  nhlogdownloadfrm(nhlogdownloadForm: any) { }

  fetchReports(city: string, department: string, month: string, year: string): void {
    if (city === 'Select City' || month === 'Select Month'  ) {
      alert("Please select all the information");
      return;
    } else {
     
      const url = this.ServerUrl+`/nhReports/nhReportPathDetails?city=${city}&month=${month}}`;
      
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
        error: (error: any) => {
          this.reports = [];
          console.error(error);
        }
      });
    }
  }

 
  private extractFileName(path: string): string {
    if (!path) return '';
    return path.split('//').pop() || '';
  }

 
  downloadReport(reportName: string): void {
  
    const url = this.ServerUrl+`/nhReports/downNhPortalReport/${reportName}?orgId=${this.orgId}`;
    
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob: Blob | MediaSource) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = reportName;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      },
      error: (error: any) => {
        console.error('Download failed:', error);
      }
    });
  }

  onViewReports(): void {
    const city =(document.getElementById('city') as HTMLSelectElement).value;
    const department = (document.getElementById('logType') as HTMLSelectElement).value;
    const month = (document.getElementById('month') as HTMLSelectElement).value;
    const year = (document.getElementById('Location') as HTMLSelectElement).value;

    if (city && department && month && year) {
      this.fetchReports(city, department, month, year);
    } else {
      
    }
  }
}


