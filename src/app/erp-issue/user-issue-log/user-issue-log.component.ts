import { Component } from '@angular/core';
import {  OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErpIssueService } from '../erp-issue.service';

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
  IssueDesc:string;
  filePath:string;
  userEmail:string;
  assignTo:string;
  aging:string;
  fileType:string;
  IssueType:string;
  IssueTime:Date;
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
  remark:string;
  currentYear:string;
  status:string;
}


@Component({
  selector: 'app-user-issue-log',
  templateUrl: './user-issue-log.component.html',
  styleUrl: './user-issue-log.component.css'
})
export class UserIssueLogComponent { 
  userissueslogForm:FormGroup;
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
  IssueDesc:string;
  filePath:string;
  userEmail:string;
  assignTo:string;
  aging:string;
  fileType:string;
  IssueType:string;
  IssueTime:Date;
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
  remark:string;
  currentYear:string;
  status:string;
  erplocationList:any=[];
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
  IssueDesc:[],
  filePath:[],
  userEmail:[],
  assignTo :[],
  aging:[],
  fileType:[],
  IssueType:[],
  IssueTime:[],
  emailcc:[],
  createdBy:[],
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
  remark:[],
  currentYear:[],
  status:[]
    })}

  get f() { return this.userissueslogForm.controls; }
  Userissuesfrm(userissueslogForm: any) { }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.userissueslogForm.patchValue({city:sessionStorage.getItem('orgName')})
    
    this.service.erplocationList(sessionStorage.getItem('orgId'))
    .subscribe(
      ( data:any) => {
        this.erplocationList = data.obj;
        console.log(this.erplocationList); 
      }
    );
  }


}
