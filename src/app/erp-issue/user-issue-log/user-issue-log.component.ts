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

const MIME_TYPES = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface uerissueslog{
  issueId:number;
  issueNo:string;
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
}


@Component({
  selector: 'app-user-issue-log',
  templateUrl: './user-issue-log.component.html',
  styleUrl: './user-issue-log.component.css'
})
export class UserIssueLogComponent {
  userissueslogForm:FormGroup;
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
userissuefromsearch:any[];
  mainimage:any=[];



  constructor(private fb: FormBuilder, private router: Router, private service: ErpIssueService) {
    this.userissueslogForm = fb.group({
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
      return <FormArray>this.userissueslogForm.get('transLines')
    }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.userissueslogForm.patchValue({attribute5:sessionStorage.getItem('orgName')});
    this.userissueslogForm.patchValue({ouId:sessionStorage.getItem('orgId')});


    var patch = this.userissueslogForm.get('transLines') as FormArray
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

    


  }
  get f() { return this.userissueslogForm.controls; }
  Userissuesfrm(userissueslogForm: any) { }

  transData(val :any){
    return val;
  }

  sendIasue(){
    const formValue = this.transData(this.userissueslogForm.value);
    console.log(formValue);
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]); 
    formData.append('objhdMst',JSON.stringify(formValue));
    this.service.IssuelogSubmit(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          this.userissueslogForm.disable();
          
        } else {
          if (res.code === 400) {
            alert(res.message);
           
          }
        }
      });


  }

  search(){
  var  issueNo = this.userissueslogForm.get('issueNo')?.value;
  var  srclocationId = this.userissueslogForm.get('srclocationId')?.value;
  var  srcdeptId = this.userissueslogForm.get('srcdeptId')?.value;
  var  status = this.userissueslogForm.get('status')?.value;
  if (issueNo === null) { issueNo = '' }
  if (srclocationId === null) { srclocationId = '' }
  if (srcdeptId === null) { srcdeptId = '' }
  if (status === null) { status = '' }

  this.service.UserissuesSearch(issueNo,sessionStorage.getItem('orgId'),srclocationId,srcdeptId,status)
  .subscribe(
    (res: any) => {
      if (res.code==200){
        alert(res.message)
      this.userissuefromsearch= res.obj;
      
   
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


  issueNoFind(){}

}
