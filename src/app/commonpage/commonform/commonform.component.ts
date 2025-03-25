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
import { CommonpageService } from '../commonpage.service';
import { data } from 'jquery';


interface uerissueslog{
  filePath:string;
  fileType:string;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:string;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  remark :string;
  currentYear:string;
  status:string;
  file:string;
  fileName:string;

}


@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrl: './commonform.component.css'
})

export class CommonformComponent {
  commonformForm:FormGroup;
  filePath:string;
  fileType:string;
  startDate:Date;
  endDate:Date;
  attribute1:number;
  attribute2:string;
  attribute3:string;
  attribute4:string;
  attribute5:string;
  remark :string;
  currentYear:string;
  file:string;
  fileName:string;
  

  @ViewChild('fileInput') fileInput:any;
  // Uploadimage: any;
  selectedFile: any;

  public fileNameList:any=[];

  

  constructor(private fb: FormBuilder, private router: Router, private service: CommonpageService) {
        this.commonformForm = fb.group({
      filePath:[],
      fileType:[],

      startDate:[],
      endDate:[],
      attribute1:[],
      attribute2:[],
      attribute3:[],
      attribute4:[],
      attribute5:[],
  
      currentYear:[],
      file:[],
      fileName:[],
     
    })
    }


    ngOnInit(): void {
      $("#wrapper").toggleClass("toggled");
      this.commonformForm.patchValue({createdBy:sessionStorage.getItem('')});
      var  fileType = this.commonformForm.get('fileType')?.value;
      if(fileType === null){
        this.commonformForm.patchValue({fileType:'none'});
      }


      this.service.fileNameList()
      .subscribe( 
        data => {
          this.fileNameList = data.obj;
          console.log(this.fileNameList);
        }
      )
  
}

get f() { return this.commonformForm.controls; }
commonformfrm(commonformForm: any) { }


onFileSelect(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}



Uploadimage(){
  let formData = new FormData();
  formData.append('imageFile', this.fileInput.nativeElement.files[0]); 
  // formData.append('file', this.fileInput.nativeElement.files[0]);  
  formData.append('attribute2',  this.commonformForm.get('attribute2')?.value); 
  // formData.append('objhdMst',JSON.stringify(formValue));
  this.service.upload(formData).subscribe((res: any) => {
      if (res.code === 200) {
        console.log('Image uploaded successfully:');
        // Show alert on successful upload
        alert('Image uploaded successfully!');
      }

      else {
        
      }
   })

}



}
