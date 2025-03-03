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
public logtypeList:any=[];
mainimage:any=[];
// viewAllDoucmnet:any;
isButtonDisabled = false;
UpdateisButtonDisabled=false;

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

    // this.service.filetypeList()
    // .subscribe( 
    //   data => {
    //     this.filetypeList = data.obj;
    //     console.log(this.filetypeList);
    //   }
    // )

    
  }

  get f() { return this. nhloguploadForm.controls; }
  nhloguploadfrm( nhloguploadForm: any) { }

}
