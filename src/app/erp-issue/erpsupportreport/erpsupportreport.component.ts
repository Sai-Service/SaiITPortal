import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as xlsx from 'xlsx';
// import saveAs from 'file-saver';

interface Transaction {
  issueNo: string;
  issueDate: string;
  subject: string;
  issueDesc: string;
  status: string;
  priority: string;
  assignTo: string;
  city: string;
  locName: string;
  userEmail:string;
  contactNo:string;
}

@Component({
  selector: 'app-erpsupportreport',
  templateUrl: './erpsupportreport.component.html',
  styleUrl: './erpsupportreport.component.css'
})
export class ErpsupportreportComponent {

  @ViewChild('epltable1', { static: false }) epltable1: ElementRef;


  fromDate: string = '';
  toDate: string = '';
  city: string = '';
  status: string = '';
  transactions: Transaction[] = [];

  constructor(private http: HttpClient) {}

  onSubmit() {
    const apiUrl = `http://localhost:8080/Transaction/issuesReportDatewise?fromDate=${this.formatDate(this.fromDate)}&toDate=${this.formatDate(this.toDate)}&city=${this.city}&status=${this.status}`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (response.code === 200 && response.obj) {
          this.transactions = response.obj;
        } else {
          console.error('Error fetching data:', response.message);
          this.transactions = [];
        }
      },
      (error) => {
        console.error('HTTP error:', error);
        this.transactions = [];
      }
    );
  }

  private formatDate(date: string): string {
    const d = new Date(date); 
    const day = d.getDate(); 
    const month = d.toLocaleString('default', { month: 'short' }); 
    const year = d.getFullYear(); 
    return `${day}-${month}-${year}`; 
  }


  exportToExcel1() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable1.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'IT Issue Report.xlsx');
   }



  
}