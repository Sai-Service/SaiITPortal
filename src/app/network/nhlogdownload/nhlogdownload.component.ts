// import { Component } from '@angular/core';
// import {  OnInit, ViewChild, ElementRef } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Validators } from '@angular/forms';
// import { style } from '@angular/animations';
// import { NgModule } from '@angular/core';
// import { FormArray } from '@angular/forms';
// import { NgForm } from '@angular/forms';
// import { DatePipe } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NetworkService } from '../network.service';
// import { data } from 'jquery';
// import { HttpClient } from '@angular/common/http';


// const MIME_TYPES :any = {
//   pdf: 'application/pdf',
//   xls: 'application/vnd.ms-excel',
//   xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
// };

// interface uerissueslog{
//   ouId:number;
//   locationId:number;
//   filePath:string;
//   logType:string;
//   startDate:Date;
//   endDate:Date;
//   attribute1:number;
//   attribute2:number;
//   attribute3:string;
//   attribute4:string;
//   attribute5:string;
//   remark :string;
//   currentYear:string;
//   file:string;
//   assignedTo:string;
//   city:string;
//   year:string;
// }


// @Component({
//   selector: 'app-nhlogdownload',
//   templateUrl: './nhlogdownload.component.html',
//   styleUrl: './nhlogdownload.component.css'
// })
// export class NhlogdownloadComponent {
//  nhlogdownloadForm:FormGroup;
//   ouId:number;
//   locationId:number;
//   filePath:string;
//   logType:string;
//   startDate:Date;
//   endDate:Date;
//   attribute1:number;
//   attribute2:number;
//   attribute3:string;
//   attribute4:string;
//   attribute5:string;
//   remark :string;
//   currentYear:string;
//   file:string;
//   year:string;
//   srcitexecutive:string;
//   srcstatus:string;
//   srclocationId:number;
//   srcdeptId:number;

//   @ViewChild('fileInput') fileInput:any;


//   public erplocationList:any=[];
//   public alllocationlist:any=[];
//   public cityList:any=[];
//   public logTypeList:any=[];
//     mainimage:any=[];
//     viewAllDoucmnet:any;
//     isButtonDisabled = false;
//   ServerUrl: string;
//   http: any;
//   reports: any;
//   errorMessage: null;
//   orgId: any;
  
  
  
//     constructor(private fb: FormBuilder, private router: Router, private service: NetworkService) {
//       this.nhlogdownloadForm = fb.group({
//     ouId:[],
//     locationId:[],
//     filePath:[],
//     logType:[],
//     startDate:[],
//     endDate:[],
//     attribute1:[],
//     attribute2:[],
//     attribute3:[],
//     attribute4:[],
//     attribute5:[],
//     year:[],
//     currentYear:[],
//     file:[],
//     srcitexecutive:[],
//     srcstatus:[],
//     srcdeptId:[],
//     srclocationId:[],
//     lastUpdatedBy:[],
//   })
//   }
   

//     ngOnInit(): void {
//       $("#wrapper").toggleClass("toggled");
//       this.nhlogdownloadForm.patchValue({createdBy:sessionStorage.getItem('orgID')});
//       var  logType = this.nhlogdownloadForm.get('logType')?.value;
//       if(logType === null){
//         this.nhlogdownloadForm.patchValue({logType:'none'});
//       }
  
       
//       this.service.erplocationList(sessionStorage.getItem('orgId'))
//     .subscribe( 
//       data => { 
//         this.erplocationList = data.obj;
//         console.log(this.erplocationList);
//       }
//     )

//     this.service.alllocationlist()
//     .subscribe( 
//       data => { 
//         this.alllocationlist = data.obj;
//         console.log(this.alllocationlist);
//       }
//     )

//     this.service.logTypeList()
//     .subscribe( 
//       data => {
//         this.logTypeList = data.obj;
//         console.log(this.logTypeList);
//       }
//     )

//     this.service.cityList()
//     .subscribe(
//       data => {
//         this.cityList = data.obj;
//         console.log(this.cityList)
//       }
//     )

    
//   }
//   get f() { return this.nhlogdownloadForm.controls; }
//   nhlogdownloadfrm(nhlogdownloadForm: any) { }

//   fetchReports(city: string, year: string, logType: string, month: string): void {
//     if (city === 'Select City' || month === 'Select Month'  ) {
//       alert("Please select all the information");
//       return;
//     } else {
     
//       const url = this.ServerUrl+`/nhReports/nhReportPathDetails?city=${city}&month=${month}&year=${year}&logType=${logType}}`;
      
//       this.http.get(url).subscribe({
//         next: (response: any) => {
//           if (response.code === 200) {
//             this.reports = response.obj.map((report: any) => ({
//               month: report.month,
//               report_name: this.extractFileName(report.report_path)
//             }));
//             this.errorMessage = null;
//           } else {
//             this.reports = [];
//             this.errorMessage = response.message || 'Failed to fetch data.';
//           }
//         },
//         error: (error: any) => {
//           this.reports = [];
//           console.error(error);
//         }
//       });
//     }
//   }

 
//   private extractFileName(path: string): string {
//     if (!path) return '';
//     return path.split('//').pop() || '';
//   }

 
//   downloadReport(reportName: string): void {
  
//     const url = this.ServerUrl+`/nhReports/downNhPortalReport/${reportName}?orgId=${this.orgId}`;
    
//     this.http.get(url, { responseType: 'blob' }).subscribe({
//       next: (blob: Blob | MediaSource) => {
//         const downloadUrl = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = downloadUrl;
//         link.download = reportName;
//         link.click();
//         window.URL.revokeObjectURL(downloadUrl);
//       },
//       error: (error: any) => {
//         console.error('Download failed:', error);
//       }
//     });
//   }

//   onViewReports(): void {
//     const city =(document.getElementById('city') as HTMLSelectElement).value;
//     // const location =(document.getElementById('location') as HTMLSelectElement).value;
//     const logType = (document.getElementById('logType') as HTMLSelectElement).value;
//     const month = (document.getElementById('month') as HTMLSelectElement).value;
//     const year = (document.getElementById('year') as HTMLSelectElement).value;

//     if (city && location && logType && month ) {
//       this.fetchReports(city, year, logType, month);
//     } else {
      
//     }
//   }
// }



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
import { ChangeDetectorRef } from '@angular/core';
import { log } from 'node:util';
import { HttpHeaders } from '@angular/common/http';
import { AppConst } from '../../app-const';


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
  year:string;
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
  year:string;
  srcitexecutive:string;
  srcstatus:string;
  srclocationId:number;
  srcdeptId:number;
  reportName:string;
  reportExtractedName:String

  @ViewChild('fileInput') fileInput:any;

  public erplocationList:any=[];
  public alllocationlist:any=[];
  public cityList:any=[];
  public logTypeList:any=[];
    mainimage:any=[];
    viewAllDoucmnet:any;
    isButtonDisabled = false;
  ServerUrl: string;
  headers: HttpHeaders;
  http: any;
  reports: any;
  errorMessage: null;
  orgId: any;
  nhteamreportsearch:any;
  
  
  
    constructor(private fb: FormBuilder, private router: Router, private service: NetworkService,private cdRef: ChangeDetectorRef) {
      this.headers = new HttpHeaders();
        this.ServerUrl = AppConst.ServerUrl;
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
    year:[],
    currentYear:[],
    file:[],
    srcitexecutive:[],
    srcstatus:[],
    srcdeptId:[],
    srclocationId:[],
    lastUpdatedBy:[],
    month:[]
    
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

  search() {
    const city = (document.getElementById('city') as HTMLSelectElement).value;
    alert("city-->"+city);
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
            } else {
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
  

openDocument(reportName: string) {
  var path = this.extractFileName(reportName);
  this.service.openDocumentFn(path)
    .subscribe((data: BlobPart) => {
      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      var url = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.href = url;
      a.download = reportName;  // You can specify a custom name or extract from the path
      document.body.appendChild(a); // Append anchor to the DOM to trigger download
      a.click();  // Programmatically click the anchor to trigger download

      // Clean up by revoking the object URL
      URL.revokeObjectURL(url);
      document.body.removeChild(a); // Remove the anchor element
    }, (error: any) => {
      console.error('Error downloading the file', error);
    });
}
  

refreshForm() {
  location.reload();
}


}