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
  image_Main:string;
  image_1:string;
  image_2:string;
  image_3:string;
  image_4:string;
  image_5:string;
  news_Line1:string;
  news_Line2:string;
  news_Line3:string;
  news_Line4:string;
  news_Line5:string;
  news_Line6:string;
  news_Line7:string;
  news_Line8:string;
  createdBy:string;

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
  image_Main:string;
  image_1:string;
  image_2:string;
  image_3:string;
  image_4:string;
  image_5:string;
  news_Line1:string;
  news_Line2:string;
  news_Line3:string;
  news_Line4:string;
  news_Line5:string;
  news_Line6:string;
  news_Line7:string;
  news_Line8:string;
  createdBy:string;


  // @ViewChild('fileInput') fileInput:any;
  // @ViewChild('fileInput1') fileInput1:any;
  // @ViewChild('fileInput2') fileInput2:any;
  // @ViewChild('fileInput3') fileInput3:any;
  // @ViewChild('fileInput4') fileInput4:any;
  // @ViewChild('fileInput5') fileInput5:any;
  // @ViewChild('fileInput6') fileInput6:any;
  // @ViewChild('fileInput7') fileInput7:any;
  @ViewChild('fileInput1') fileInput1!: ElementRef;
  @ViewChild('fileInput2') fileInput2!: ElementRef;
  @ViewChild('fileInput3') fileInput3!: ElementRef;
  @ViewChild('fileInput4') fileInput4!: ElementRef;
  @ViewChild('fileInput5') fileInput5!: ElementRef;
  @ViewChild('fileInput6') fileInput6!: ElementRef;
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
      image_Main:[],
      image_1:[],
      image_2:[],
      image_3:[],
      image_4:[],
      image_5:[],
      news_Line1:[],
      news_Line2:[],
      news_Line3:[],
      news_Line4:[],
      news_Line5:[],
      news_Line6:[],
      news_Line7:[],
      news_Line8:[],
      createdBy:[],
     
    })
    }


    ngOnInit(): void {
      $("#wrapper").toggleClass("toggled");
      this.commonformForm.patchValue({createdBy:sessionStorage.getItem('userName')});
      var  fileType = this.commonformForm.get('fileType')?.value;
      if(fileType === null){
        this.commonformForm.patchValue({fileType:'none'});
      }


      
    // this.service.fileNameList(sessionStorage.getItem(''))
    // .subscribe( 
    //   data => { 
    //     this.fileNameList = data.obj;
    //     console.log(this.fileNameList);
    //   }
    // )


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



// Uploadimage(){
//   let formData = new FormData();
//   formData.append('image_Main', this.fileInput1.nativeElement.files[0]); 
//   formData.append('image_1', this.fileInput2.nativeElement.files[0]); 
//   formData.append('image_2', this.fileInput3.nativeElement.files[0]); 
//   formData.append('image_3', this.fileInput4.nativeElement.files[0]); 
//   formData.append('image_4', this.fileInput5.nativeElement.files[0]); 
//   formData.append('image_5', this.fileInput6.nativeElement.files[0]); 
//   // formData.append('file', this.fileInput.nativeElement.files[0]);  
//   formData.append('createdBy', this.commonformForm.get('createdBy')?.value ||'') 
//   // this.service.erplocationList(sessionStorage.getItem('orgId'))
//   // formData.append('objhdMst',JSON.stringify(formValue));
//   this.service.upload(formData).subscribe((res: any) => {
//       if (res.code === 200) {
//         console.log('Image uploaded successfully:');
//         // Show alert on successful upload
//         alert('Image uploaded successfully!');
//       }

//       else {
        
//       }
//    })

// }

Uploadimage() {
  let formData = new FormData();

  if (this.fileInput1?.nativeElement.files.length > 0) {
    formData.append('image_Main', this.fileInput1.nativeElement.files[0]);
  }
  if (this.fileInput2?.nativeElement.files.length > 0) {
    formData.append('image_1', this.fileInput2.nativeElement.files[0]);
  }
  if (this.fileInput3?.nativeElement.files.length > 0) {
    formData.append('image_2', this.fileInput3.nativeElement.files[0]);
  }
  if (this.fileInput4?.nativeElement.files.length > 0) {
    formData.append('image_3', this.fileInput4.nativeElement.files[0]);
  }
  if (this.fileInput5?.nativeElement.files.length > 0) {
    formData.append('image_4', this.fileInput5.nativeElement.files[0]);
  }
  if (this.fileInput6?.nativeElement.files.length > 0) {
    formData.append('image_5', this.fileInput6.nativeElement.files[0]);
  }

  formData.append('createdBy', this.commonformForm.get('createdBy')?.value || '');

  this.service.upload(formData).subscribe((res: any) => {
    if (res.code === 200) {
      alert('Image uploaded successfully!');
    } else {
      alert('Upload failed');
    }
  });
}



   
}
