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
import { data } from 'jquery';
import { ChangeDetectorRef } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AppConst } from '../../app-const';
import { AccountsService } from '../accounts.service';

const MIME_TYPES :any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface uerissueslog{
  ouId:number;
  locationId:number;
  filePath:string;
  reportType:string;
  uploadType:string;
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
  year:string;
  financialyear:string;
}

@Component({
  selector: 'app-account-report-view',
  templateUrl: './account-report-view.component.html',
  styleUrl: './account-report-view.component.css'
})

export class AccountReportViewComponent {
acreportviewForm:FormGroup;
  ouId:number;
  locationId:number;
  filePath:string;
  reportType:string;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:number;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  remark :string;
  month:string;
  financialyear:string;
  file:string;
  year:string;
  uploadType:string;
  srcitexecutive:string;
  srcstatus:string;
  srclocationId:number;
  srcdeptId:number;
  fileName:string;
  reportExtractedName:String;
  currentYear: number = new Date().getFullYear();
  previousYear: number = this.currentYear - 1;

  @ViewChild('fileInput') fileInput:any;

  public erplocationList:any=[];
  public reporttypelist:any=[];
  public uploadtypelist:any=[];
  public alllocationlist:any=[];
  public cityList:any=[];
    mainimage:any=[];
    viewAllDoucmnet:any;
    isButtonDisabled = false;
  ServerUrl: string;
  headers: HttpHeaders;
  http: any;
  reports: any;
  errorMessage: null;
  orgId: any;
  acreportsearch:any;
  

constructor(private fb: FormBuilder, private router: Router, private service: AccountsService,private cdRef: ChangeDetectorRef) {
        this.headers = new HttpHeaders();
          this.ServerUrl = AppConst.ServerUrl;
        this.acreportviewForm = fb.group({
  
      ouId:[],
      locationId:[],
      filePath:[],
      reportType:[],
      uploadType:[],
      startDate:[],
      endDate:[],
      attribute1:[],
      attribute2:[],
      attribute3:[],
      attribute4:[],
      attribute5:[],
      year:[],
      currentYear: [new Date().getFullYear().toString()],
      file:[],
      srcitexecutive:[],
      srcstatus:[],
      srcdeptId:[],
      srclocationId:[],
      lastUpdatedBy:[],
      month:[],
      financialyear:[]
    })
    
    }
   
     ngOnInit(): void {
      $("#wrapper").toggleClass("toggled");
      // currentYear: new Date().getFullYear().toString()
      this.acreportviewForm.patchValue({createdBy:sessionStorage.getItem('orgID')});
  
       
      this.service.erplocationList(sessionStorage.getItem('orgId'))
    .subscribe( 
      data => { 
        this.erplocationList = data.obj;
        console.log(this.erplocationList);
      }
    )

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
  get f() { return this.acreportviewForm.controls; }
  acreportviewfrm(acreportviewForm: any) { }


  //  search() {
  //   const city = this.acreportviewForm.get('ouId')?.value;
  //   const year = this.acreportviewForm.get('year')?.value;
  //   const uploadType = this.acreportviewForm.get('uploadType')?.value;
  //   const reportType = this.acreportviewForm.get('reportType')?.value;
  //   const month = this.acreportviewForm.get('month')?.value;
    
  //   this.service.acreportsearch(city, reportType, month, year, uploadType)
  //     .subscribe(
  //       (res: any) => {
  //         if (res.code == 200) {
  //           alert(res.message);
            
  //           this.acreportsearch = res.obj;
  
  //           if (Array.isArray(res.obj) && res.obj.length > 0) {
  //             const reportPath = res.obj[0].report_path; 
  //             if (typeof reportPath === 'string') {
  //                const fileName = this.extractFileName(reportPath);
  //               console.log('Extracted file name: ', fileName);  
  //             } else {
  //               console.error('Expected report_path to be a string, but got:', typeof reportPath);
  //             }
  //           } 
  //           else {
  //             console.error('Expected res.obj to be a non-empty array.');
  //           }
  //         } else {
  //         }
  //       },
  //       (error: any) => {
  //         console.error('Error occurred: ', error);
  //       }
  //     );
  // }


  search() {
  var city = this.acreportviewForm.get('ouId')?.value;
  var year = this.acreportviewForm.get('currentYear')?.value;
  var uploadType = this.acreportviewForm.get('uploadType')?.value;
  var reportType = this.acreportviewForm.get('reportType')?.value;
  var month = this.acreportviewForm.get('month')?.value;
   if( city ===null){city=''}
   if( year ===null){year=''}
   if( uploadType ===null){uploadType=''}
   if( reportType ===null){reportType=''}
   if( month ===null){month=''}

 
  if (!city && !year && !uploadType && !reportType && !month) {
    alert("Please select at least one field to search.");
    return;
  }

  this.service.acreportsearch(city, reportType, month, year, uploadType)
    .subscribe(
      (res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.acreportsearch = res.obj;

          if (Array.isArray(res.obj) && res.obj.length > 0) {
            const reportPath = res.obj[0].report_path; 
            if (typeof reportPath === 'string') {
              const fileName = this.extractFileName(reportPath);
              console.log('Extracted file name: ', fileName);  
            } else {
              console.error('Expected report_path to be a string, but got:', typeof reportPath);
            }
          } else {
            console.error('Expected res.obj to be a non-empty array.');
          }
        } else {
          alert("Search failed or no results found.");
        }
      },
      (error: any) => {
        console.error('Error occurred: ', error);
      }
    );
}

  private extractFileName(path: string): string {
    if (!path) return '';
    if (typeof path !== 'string') {
      console.error('Expected path to be a string but got:', typeof path);
      return '';  
    }
    return path.split('//').pop() || '';  
  }
  

openDocument(fileName: string) {
  var path = this.extractFileName(fileName);
  this.service.openDocumentFn(path)
    .subscribe((data: BlobPart) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

      var url = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.href = url;
      a.download = fileName;  
      document.body.appendChild(a);
      a.click();  

      
      URL.revokeObjectURL(url);
      document.body.removeChild(a); 
    }, (error: any) => {
      console.error('Error downloading the file', error);
    });
}
  

refreshForm() {
  location.reload();
}

  
 
}
