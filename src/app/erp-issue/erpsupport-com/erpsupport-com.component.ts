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
import { ErpIssueService } from '../erp-issue.service';
import { data } from 'jquery';

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface uerissueslog{
  itexecutive:string;
  issueId:number;
  issueNo:string | any;
  issueDate:Date;
  priority:string;
  ouId:number;
  locationId:number;
  deptId:number;
  module:string;
  userSubject:string;
  subject:string;
  userName:string;
  contactNo:string;
  issueDesc:string;
  filePath:string;
  userEmail:string;
  assignTo :string;
  aging:string;
  fileType:string;
  issueType:string;
  issueTime:Date;
  emailcc:string;
  createdBy:string;
  creationDt:Date;
  lastUpdatedBy:string;
  lastUpdationDt:Date;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:number;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  remark :string;
  currentYear:string;
  status:string;
  file:string;
  city:string;
}

@Component({
  selector: 'app-erpsupport-com',
  templateUrl: './erpsupport-com.component.html',
  styleUrl: './erpsupport-com.component.css'
})
export class ErpsupportComComponent {
  erpsupportcomForm:FormGroup;
  itexecutive:string;
  issueId:number;
  issueNo :string;
  issueDate:Date;
  priority:string;
  ouId:number;
  locationId:number;
  deptId:number;
  module :string;
  userSubject:string;
  subject:string;
  userName:string;
  contactNo:string;
  issueDesc:string;
  filePath:string;
  userEmail:string;
  assignTo :string;
  aging:string;
  fileType:string;
  issueType:string;
  issueTime:Date;
  emailcc:string;
  createdBy :string;
  creationDt:Date;
  lastUpdatedBy:string;
  lastUpdationDt:Date;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:number;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  remark :string;
  currentYear:string;
  status:string;
  file:string;
  city:string;
  srclocationId:number;
  srcdeptId:number;
  @ViewChild('fileInput') fileInput:any;


  public erplocationList:any=[];
  public priorityList:any=[];
  public issueTypeList:any=[];
  public departmentList:any=[];
  public ModuletList:any=[];
  public issuediscList:any=[];
  public filetypeList:any=[];
  public issuestatusList:any=[];
  public itsupportList:any=[];
  public cityList:any=[];
  erpsupportfromsearch:any=[];
    mainimage:any=[];
    viewAllDoucmnet:any;
  
  
    constructor(private fb: FormBuilder, private router: Router, private service: ErpIssueService) {
      this.erpsupportcomForm = fb.group({
    itexecutive:[],
    issueId:[],
    issueNo:[],
    issueDate:[],
    priority:[],
    ouId:[],
    locationId:[],
    deptId:[],
    module:[],
    userSubject:[],
    subject:[],
    userName:[],
    contactNo:[],
    issueDesc:[],
    filePath:[],
    userEmail:[],
    assignTo:[],
    aging:[],
    fileType:[],
    issueType:[],
    issueTime:[],
    emailcc:[],
    createdBy :[],
    creationDt:[],
    lastUpdatedBy:[],
    lastUpdationDt:[],
    startDate:[],
    endDate:[],
    attribute1:[],
    attribute2:[],
    attribute3:[],
    attribute4:[],
    attribute5:[],
    remark :[],
    currentYear:[],
    status:[],
    file:[],
    city:[],
    srcdeptId:[],
    srclocationId:[],
    transLines:this.fb.array([this.UserissueLinesGroup()]),
  })
  }

  UserissueLinesGroup() {
    return this.fb.group({

      status:[],
      remark :['CUSTOMER WORKING'],

    })}
   
    orderlineDetailsArray(): FormArray {
      return <FormArray>this.erpsupportcomForm.get('transLines')
    }

    ngOnInit(): void {
      $("#wrapper").toggleClass("toggled");
      // this.erpsupportcomForm.patchValue({attribute5:sessionStorage.getItem('orgName')});
      // this.erpsupportcomForm.patchValue({ouId:sessionStorage.getItem('orgId')});
  
  
      var patch = this.erpsupportcomForm.get('transLines') as FormArray
      (patch.controls[0]).patchValue(
        {
          remark:'remark',
          status:'CUSTOMER WORKING',    
         
        }
      );
       
      this.service.erplocationList(sessionStorage.getItem('orgId'))
    .subscribe( 
      data => { 
        this.erplocationList = data.obj;
        console.log(this.erplocationList);
      }
    )


    this.service.priorityList()
    .subscribe( 
      data => {
        this.priorityList = data.obj;
        console.log(this.priorityList);
      }
    )


    this.service.issueTypeList()
    .subscribe( 
      data => {
        this.issueTypeList = data.obj;
        console.log(this.issueTypeList);
      }
    )

    this.service.departmentList()
    .subscribe( 
      data => {
        this.departmentList = data.obj;
        console.log(this.departmentList);
      }
    )

    this.service.ModuletList()
    .subscribe( 
      data => {
        this.ModuletList = data.obj;
        console.log(this.ModuletList);
      }
    )


    this.service.issuediscList()
    .subscribe( 
      data => {
        this.issuediscList = data.obj;
        console.log(this.issuediscList);
      }
    )

    this.service.filetypeList()
    .subscribe( 
      data => {
        this.filetypeList = data.obj;
        console.log(this.filetypeList);
      }
    )

    this.service.issuestatusList()
    .subscribe( 
      data => {
        this.issuestatusList = data.obj;
        console.log(this.issuestatusList);
      }
    )

    this.service.itsupportList()
    .subscribe(
      data => {
        this.itsupportList = data.obj;
        console.log(this.itsupportList)
      }
    )

    this.service.cityList()
    .subscribe(
      data => {
        this.cityList = data.obj;
        console.log(this.itsupportList)
      }
    )

    
  }
  get f() { return this.erpsupportcomForm.controls; }
  erpsupportfrm(erpsupportcomForm: any) { }


  transData(val :any){
    delete val.srclocationId
    delete val.srcdeptId

    return val;
 }

 search(){
  var  issueNo = this.erpsupportcomForm.get('issueNo')?.value;
  var  srclocationId = this.erpsupportcomForm.get('srclocationId')?.value;
  var  srcdeptId = this.erpsupportcomForm.get('srcdeptId')?.value;
  var  ouId = this.erpsupportcomForm.get('ouId')?.value;
  var  itexecutive = this.erpsupportcomForm.get('itexecutive')?.value;
  var  status = this.erpsupportcomForm.get('status')?.value;
  if (issueNo === null) { issueNo = '' }
  if (srclocationId === null) { srclocationId = '' }
  if (srcdeptId === null) { srcdeptId = '' }
  if (itexecutive === null) { itexecutive = '' }
  if (status === null) { status = '' }

  this.service.ErpissuesSearch(issueNo,ouId,srclocationId,srcdeptId,status)
  .subscribe(
    (res: any) => {
      if (res.code==200){
        alert(res.message)
      this.erpsupportfromsearch= res.obj;
   
    if (res.obj.length !=0){
      
    }
}
  else {
    if (res.code === 400) {
      alert(res.message);
      
    }
  }
    });


  }


  issueNoFind(issueNo:any):void{
    this.service.IssueNoFindFN(issueNo)
    .subscribe(
      data=> {
        if (data.code === 200) {
        this.erpsupportcomForm.patchValue({issueNo:data.obj.issueNo,priority:data.obj.priority,module:data.obj.module,
          locationId:data.obj.locationId,userEmail:data.obj.userEmail,locName:data.obj.locName,userName:data.obj.userName,
          contactNo:data.obj.contactNo,issueDesc:data.obj.issueDesc,subject:data.obj.userSubject,deptId:data.obj.deptId,
          issueType:data.obj.issueType});
        this.erpsupportcomForm.patchValue({attribute4:data.obj.issueNo});
        
        this.erpsupportcomForm.disable();

        this.service.viewIssueTrnslnFn(issueNo).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.viewAllDoucmnet = res.obj.transLines;
            
          }
          // else { }
        
        })
        
      }


        else {
          alert(data.code===400)
          
        }  
       
      }
    )

  }

  viewDocument(){}


  openDocument(){}
}