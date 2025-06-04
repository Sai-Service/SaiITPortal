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
  // remark :string;
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
  // remark :string;
  currentYear:string;
  status:string;
  file:string;
  srclocationId:number;
  srcdeptId:number;
  @ViewChild('fileInput') fileInput:any;
  @ViewChild('fileInput1') fileInput1:any;
  showPopup = false;
  responseMessage: string;

public erplocationList:any=[];
public priorityList:any=[];
public issueTypeList:any=[];
public departmentList:any=[];
public ModuletList:any=[];
public issuediscList:any=[];
public filetypeList:any=[];
public issuestatusList:any=[];
userissuefromsearch:any=[];
mainimage:any=[];
contactError:string='';
emailError:string='';
viewAllDoucmnet:any;
isButtonDisabled = false;
UpdateisButtonDisabled=false;
checkValidation = false;
isIssueClosed = false;

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
  lastUpdatedBy:['U'],
  lastUpdationDt:[],
  startDate:[],
  endDate:[],
  attribute1:[],
  attribute2:[],
  attribute3:[],
  attribute4:[],
  attribute5:[],
  // remark :[],
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
      remark :[],
      filepath:[],
      lastUpdatedBy:['U'],

    })}

    orderlineDetailsArray(): FormArray {
      return <FormArray>this.userissueslogForm.get('transLines')
    }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    this.userissueslogForm.patchValue({attribute5:sessionStorage.getItem('orgName')});
    this.userissueslogForm.patchValue({ouId:sessionStorage.getItem('orgId')});
    this.userissueslogForm.patchValue({createdBy:sessionStorage.getItem('userName')});
    this.userissueslogForm.patchValue({assignTo:'SUPPORT'});
    


    var patch = this.userissueslogForm.get('transLines') as FormArray
    (patch.controls[0]).patchValue(
      {
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
     delete val.srclocationId
     delete val.srcdeptId

     return val;
  }



  validation() {
    var userSubject = this.userissueslogForm.get('userSubject')?.value;
    var locationId = this.userissueslogForm.get('locationId')?.value;
    var issueType = this.userissueslogForm.get('issueType')?.value;
    var deptId = this.userissueslogForm.get('deptId')?.value;
    var issueDesc = this.userissueslogForm.get('issueDesc')?.value;
    var subject = this.userissueslogForm.get('subject')?.value;
    var module = this.userissueslogForm.get('module')?.value;
    var userName = this.userissueslogForm.get('userName')?.value;
    
    
    if (locationId === undefined || locationId === null || locationId === '') {
      this.checkValidation = false;
      alert('Please Select Location .!');
      return;
    }
    if (locationId === undefined || locationId === null || locationId === '') {
      this.checkValidation = false;
      alert('Please Enter Your Name.!');
      return;
    }
    if (issueType === undefined || issueType === null || issueType === '') {
      this.checkValidation = false;
      alert('Please Select Issue Type.!');
      return;
    }
    if (deptId === undefined || deptId === null || deptId === '') {
      this.checkValidation = false;
      alert('Please Select Department .!');
      return;
    }
    if (userSubject === undefined || userSubject === null || userSubject === '') {
      this.checkValidation = false;
      alert('Please Enter User Subject .!');
      return;
    }
    if (issueDesc === undefined || issueDesc === null || issueDesc === '') {
      this.checkValidation = false;
      alert('Please Enter Issue Description .!');
      return;
    }
    if (module === undefined || module === null || module === '') {
      this.checkValidation = false;
      alert('Please Select Module .!');
      return;
    }
    if (subject === undefined || subject === null || subject === '') {
      this.checkValidation = false;
      alert('Please Enter Issue-Description Title .!');
      return;
    }
    this.checkValidation = true
}

  sendIasue(){
    const formValue = this.transData(this.userissueslogForm.value);
    this.validation();
    if (this.checkValidation === true) {
    this.userissueslogForm.patchValue({lastUpdatedBy:'U'});
    console.log(formValue);
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]); 
    formData.append('objhdMst',JSON.stringify(formValue));
    this.service.IssuelogSubmit(formData).subscribe((res: any) => {
        if (res.code === 200) {
          this.isButtonDisabled = true;
          this.showPopup = true;
          this.responseMessage=res.message;
          alert('Issue Registration No -'+ res.obj.issueNo);
          this.userissueslogForm.get('locationId')?.disable();
          this.userissueslogForm.get('priority')?.disable();
          this.userissueslogForm.get('userName')?.disable();
          this.userissueslogForm.get('userEmail')?.disable();
          this.userissueslogForm.get('contactNo')?.disable();
          this.userissueslogForm.get('issueType')?.disable();
           this.userissueslogForm.get('deptId')?.disable();
          this.userissueslogForm.get('module')?.disable();
          this.userissueslogForm.get('userSubject')?.disable();
          this.userissueslogForm.get('subject')?.disable();
          this.userissueslogForm.get('issueDesc')?.disable();   
          // this.userissueslogForm.disable();
        } 
        if (res.code === 500) {
          alert(res.message);
          this.showPopup = true;
          this.responseMessage=res.message;
         
        }
        else {
          if (res.code === 400) {
            alert(res.message);
            this.showPopup = true;
            this.responseMessage=res.message;
           
          }
        }
      });

    }
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
      this.userissueslogForm.get('locationId')?.disable();
      this.userissueslogForm.get('priority')?.disable();
      this.userissueslogForm.get('userName')?.disable();
      this.userissueslogForm.get('userEmail')?.disable();
      this.userissueslogForm.get('contactNo')?.disable();
      this.userissueslogForm.get('issueType')?.disable();
       this.userissueslogForm.get('deptId')?.disable();
      this.userissueslogForm.get('module')?.disable();
      this.userissueslogForm.get('userSubject')?.disable();
      this.userissueslogForm.get('subject')?.disable();
      this.userissueslogForm.get('issueDesc')?.disable();
      
   
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
        this.userissueslogForm.patchValue({issueNo:data.obj.issueNo,priority:data.obj.priority,module:data.obj.module,
          locationId:data.obj.locationId,userEmail:data.obj.userEmail,locName:data.obj.locName,userName:data.obj.userName,
          contactNo:data.obj.contactNo,issueDesc:data.obj.issueDesc,subject:data.obj.userSubject,deptId:data.obj.deptId,issueType:data.obj.issueType});
        this.userissueslogForm.patchValue({issueType:data.obj.issueType});
        this.userissueslogForm.patchValue({filePath:data.obj.filePath});
        this.userissueslogForm.patchValue({status:data.obj.status});
        this.userissueslogForm.patchValue({issueDesc:data.obj.issueDesc});
        this.userissueslogForm.patchValue({userSubject:data.obj.userSubject});
        this.userissueslogForm.patchValue({subject:data.obj.subject});
        this.userissueslogForm.patchValue({attribute4:issueNo});
        this.userissueslogForm.patchValue({issueDate:data.obj.issueDate,fileType:'none'});
        this.userissueslogForm.get('locationId')?.disable();
        this.userissueslogForm.get('priority')?.disable();
        this.userissueslogForm.get('userName')?.disable();
        this.userissueslogForm.get('userEmail')?.disable();
        this.userissueslogForm.get('contactNo')?.disable();
        this.userissueslogForm.get('issueType')?.disable();
         this.userissueslogForm.get('deptId')?.disable();
        this.userissueslogForm.get('module')?.disable();
        this.userissueslogForm.get('userSubject')?.disable();
        this.userissueslogForm.get('subject')?.disable();
        this.userissueslogForm.get('issueDesc')?.disable();
        this.isButtonDisabled = true;
        this.service.viewIssueTrnslnFn(issueNo).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.viewAllDoucmnet = res.obj.transLines;
            this.userissueslogForm.patchValue({assignTo:data.obj.assignTo});
  
            
          }

          if (data.obj.status === 'CLOSED') {
            this.isIssueClosed = true;
            this.disableFormControls();
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

  issueupdate(){
    const formValue = this.transData(this.userissueslogForm.getRawValue());
    var issueNo = this.userissueslogForm.get('issueNo')?.value;
    console.log(formValue);
    let formData = new FormData();
      // formData.append('file', this.fileInput1.nativeElement.files[0]);
      // alert(this.fileInput1)
      if (this.fileInput1?.nativeElement?.files[0]) {
        formData.append('file', this.fileInput1.nativeElement.files[0]); 
      } else {
        formData.append('file', '');
      }
    formData.append('objhdMst',JSON.stringify(formValue));
    this.service.updateUserIssueLinefn(formData,issueNo).subscribe((res: any) => {
      if (res.code === 200) {
        alert(res.message);
        this.UpdateisButtonDisabled=true;
      }
      else{
        alert(res.message);
      }
    })


  }

  viewDocument(){}

  refreshForm() {
    location.reload();
  }


//   openDocument(trlineId:any,filePath:any){
//     const fileName = 'download.pdf';
//     this.service.openDocumentFn(trlineId, filePath)
//       .subscribe(data => {
//         var blob = new Blob([data] , { type: 'application/pdf' });
//         var url = URL.createObjectURL(blob);
//         var printWindow = window.open(url, '', 'width=800,height=500');
      
//         //  { type: 'application/pdf' }

//       });
// }

openDocument(trlineId: any, filePath: any) {
  const fileName = filePath.split('/').pop(); // Get file name from path
  const fileExtension = fileName?.split('.').pop()?.toLowerCase(); // Get file extension

  const mimeTypes: { [key: string]: string } = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'xls': 'application/vnd.ms-excel',
    'csv': 'text/csv'
  };

  const mimeType = mimeTypes[fileExtension || ''] || 'application/octet-stream'; // Fallback

  this.service.openDocumentFn(trlineId, filePath).subscribe(data => {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);

    if (mimeType.startsWith('image/') || mimeType === 'application/pdf') {
      // View directly in a new window/tab
      window.open(url, '_blank', 'width=800,height=600');
    } else {
      // For other types (Excel, CSV, etc.), force download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
}


  closePopup(){
    this.showPopup = false;
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`File Uploaded Successfully: ${file.name}`);
    } else {
      alert("No file selected.");
    }
   }






   validateContact(value: string) {
    const contactPattern = /^[0-9]{10}$/; // 10-digit number validation
    if (!value) {
      this.contactError = 'Contact number is required.';
    } else if (!contactPattern.test(value)) {
      this.contactError = 'Enter a valid 10-digit number.';
    } else {
      this.contactError = ''; // No error
    }
  }



  validateEmails(value: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Email regex
    if (!value) {
      this.emailError = 'Email field is required.';
      return;
    }
  
    // Split input by ',' or ';' and trim spaces
    const emailArray = value.split(/[;,]+/).map(email => email.trim());
  
    // Validate each email
    const invalidEmails = emailArray.filter(email => !emailPattern.test(email));
  
    if (invalidEmails.length > 0) {
      this.emailError = `Invalid email(s): ${invalidEmails.join(', ')}`;
    } else {
      this.emailError = ''; // No errors
    }
  }


  closeIssue() {
    const issueNo = this.userissueslogForm.get('issueNo')?.value;
    if (!issueNo) {
      alert("No issue selected to close.");
      return;
    }
  
    // Mark status as CLOSED
    this.userissueslogForm.patchValue({ status: 'CLOSED' });
  
    const formValue = this.transData(this.userissueslogForm.getRawValue());
  
    let formData = new FormData();
    formData.append('objhdMst', JSON.stringify(formValue));
    formData.append('file', ''); // No file needed to close
  
    this.service.updateUserIssueLinefn(formData, issueNo).subscribe((res: any) => {
      if (res.code === 200) {
        alert("Issue Closed Successfully.");
        this.isIssueClosed = true;
        this.disableFormControls();
      } else {
        alert(res.message);
      }
    });
  }

  disableFormControls() {
    this.userissueslogForm.disable();
    this.UpdateisButtonDisabled = true;
    this.isButtonDisabled = true;
  }

}