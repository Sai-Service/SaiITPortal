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
import { ItreportsService } from '../itreports.service';

interface uerissueslog{
  filePath:string;
  fileType:string;
  createdBy:string;
  creationDt:Date;
  UpdatedBy:string;
  UpdationDt:Date;
  file:string;
}

@Component({
  selector: 'app-annualpresentation',
  templateUrl: './annualpresentation.component.html',
  styleUrl: './annualpresentation.component.css'
})
export class AnnualpresentationComponent {

  annualpresentationForm:FormGroup;
  filePath:string;
  fileType:string;
  createdBy:string;
  creationDt:Date;
  UpdatedBy:string;
  UpdationDt:Date;
  file:string;
 reports: any[] = [];

 constructor(private fb: FormBuilder, private router: Router, private service: ItreportsService) {
    this.annualpresentationForm = fb.group({

  filePath:[],
  fileType:[],
  createdBy:[],
  creationDt:[],
  UpdatedBy:[],
  UpdationDt:[],
  file:[],

    })
  }


  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  
    this.loadReports(); 

  }


   loadReports() {
    this.service.getPresentationReports('common').subscribe(
      (data:any) => {
        this.reports = data.obj;
      },
      (error) => {
        console.error('Error fetching reports', error);
      }
    );
  }

  downloadReport(fileName: string) {
    const downloadUrl = this.service.downloadPresentationReport(fileName);
    window.open(downloadUrl, '_blank');
  }

}


