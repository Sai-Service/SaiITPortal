import { Component } from '@angular/core';
import { OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { NgModule } from '@angular/core';
import { FormArray } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BajajIssueService } from '../bajaj-issue.service';

const MIME_TYPES = {
  pdf:  'application/pdf',
  xls:  'application/vnd.ms-excel',
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
  selector: 'app-bajaj-user-issue',
  templateUrl: './bajaj-user-issue.component.html',
  styleUrl: './bajaj-user-issue.component.css'
})
export class BajajUserIssueComponent {
  bajajuserissuesForm:FormGroup;
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


public bajajlocationList:any=[];
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

  constructor(private fb: FormBuilder, private router: Router, private service: BajajIssueService) { 
    this.bajajuserissuesForm = fb.group({
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
      return <FormArray>this.bajajuserissuesForm.get('transLines')
    }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
    alert(sessionStorage.getItem('orgId'))
    this.bajajuserissuesForm.patchValue({attribute5:sessionStorage.getItem('orgId')});
    this.bajajuserissuesForm.patchValue({ouId:sessionStorage.getItem('orgId')});
    this.bajajuserissuesForm.patchValue({createdBy:sessionStorage.getItem('userName')});
    this.bajajuserissuesForm.patchValue({assignTo:'SUPPORT'});
    

    var patch = this.bajajuserissuesForm.get('transLines') as FormArray
    (patch.controls[0]).patchValue(
      {
        status:'CUSTOMER WORKING',    
       
      }
    );
   
  
    this.service.bajajlocationList(sessionStorage.getItem('orgId'))
    .subscribe( 
      data => { 
        this.bajajlocationList = data.obj;
        console.log(this.bajajlocationList);
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

  get f() { return this.bajajuserissuesForm.controls; }
  bajajuserissuesfrm(bajajuserissuesForm: any) { }

  transData(val :any){
     delete val.srclocationId
     delete val.srcdeptId

     return val;
  }

  sendIssue(){
    this.isButtonDisabled = true;
    this.bajajuserissuesForm.patchValue({lastUpdatedBy:'U'});
    const formValue = this.transData(this.bajajuserissuesForm.value);
    console.log(formValue);
    let formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]); 
    formData.append('objhdMst',JSON.stringify(formValue));
    this.service.IssuelogSubmit(formData).subscribe((res: any) => {
        if (res.code === 200) {
          alert(res.message);
          alert(res.obj.issueNo),
          this.bajajuserissuesForm.get('locationId')?.disable();
          this.bajajuserissuesForm.get('priority')?.disable();
          this.bajajuserissuesForm.get('userName')?.disable();
          this.bajajuserissuesForm.get('userEmail')?.disable();
          this.bajajuserissuesForm.get('contactNo')?.disable();
          this.bajajuserissuesForm.get('issueType')?.disable();
           this.bajajuserissuesForm.get('deptId')?.disable();
          this.bajajuserissuesForm.get('module')?.disable();
          this.bajajuserissuesForm.get('userSubject')?.disable();
          this.bajajuserissuesForm.get('subject')?.disable();
          this.bajajuserissuesForm.get('issueDesc')?.disable();
          
          // this.userissueslogForm.disable();
          
        } else {
          if (res.code === 400) {
            alert(res.message);
           
          }
        }
      });


  }

  search(){
  var  issueNo = this.bajajuserissuesForm.get('issueNo')?.value;
  var  srclocationId = this.bajajuserissuesForm.get('srclocationId')?.value;
  var  srcdeptId = this.bajajuserissuesForm.get('srcdeptId')?.value;
  var  status = this.bajajuserissuesForm.get('status')?.value;
  if (issueNo === null) { issueNo = '' }
  if (srclocationId === null) { srclocationId = '' }
  if (srcdeptId === null) { srcdeptId = '' }
  if (status === null) { status = '' }

  this.service.bajajuserissuesSearch(issueNo,sessionStorage.getItem('orgId'),srclocationId,srcdeptId,status)
  .subscribe(
    (res: any) => {
      if (res.code==200){
        alert(res.message)
      this.userissuefromsearch= res.obj;
      this.bajajuserissuesForm.get('locationId')?.disable();
      this.bajajuserissuesForm.get('priority')?.disable();
      this.bajajuserissuesForm.get('userName')?.disable();
      this.bajajuserissuesForm.get('userEmail')?.disable();
      this.bajajuserissuesForm.get('contactNo')?.disable();
      this.bajajuserissuesForm.get('issueType')?.disable();
      this.bajajuserissuesForm.get('deptId')?.disable();
      this.bajajuserissuesForm.get('module')?.disable();
      this.bajajuserissuesForm.get('userSubject')?.disable();
      this.bajajuserissuesForm.get('subject')?.disable();
      this.bajajuserissuesForm.get('issueDesc')?.disable();
      
   
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
        this.bajajuserissuesForm.patchValue({issueNo:data.obj.issueNo,priority:data.obj.priority,module:data.obj.module,
          locationId:data.obj.locationId,userEmail:data.obj.userEmail,locName:data.obj.locName,userName:data.obj.userName,
          contactNo:data.obj.contactNo,issueDesc:data.obj.issueDesc,subject:data.obj.userSubject,deptId:data.obj.deptId,issueType:data.obj.issueType});
        this.bajajuserissuesForm.patchValue({issueType:data.obj.issueType});
        this.bajajuserissuesForm.patchValue({filePath:data.obj.filePath});
        this.bajajuserissuesForm.patchValue({status:data.obj.status});
        this.bajajuserissuesForm.patchValue({issueDesc:data.obj.issueDesc});
        this.bajajuserissuesForm.patchValue({userSubject:data.obj.userSubject});
        this.bajajuserissuesForm.patchValue({subject:data.obj.subject});
        this.bajajuserissuesForm.patchValue({attribute4:issueNo});
        this.bajajuserissuesForm.patchValue({issueDate:data.obj.issueDate});
        
        this.bajajuserissuesForm.get('locationId')?.disable();
        this.bajajuserissuesForm.get('priority')?.disable();
        this.bajajuserissuesForm.get('userName')?.disable();
        this.bajajuserissuesForm.get('userEmail')?.disable();
        this.bajajuserissuesForm.get('contactNo')?.disable();
        this.bajajuserissuesForm.get('issueType')?.disable();
         this.bajajuserissuesForm.get('deptId')?.disable();
        this.bajajuserissuesForm.get('module')?.disable();
        this.bajajuserissuesForm.get('userSubject')?.disable();
        this.bajajuserissuesForm.get('subject')?.disable();
        this.bajajuserissuesForm.get('issueDesc')?.disable();
        this.isButtonDisabled = true;
        this.service.viewIssueTrnslnFn(issueNo).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.viewAllDoucmnet = res.obj.transLines;
            this.bajajuserissuesForm.patchValue({assignTo:data.obj.assignTo});
            
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
    const formValue = this.transData(this.bajajuserissuesForm.getRawValue());
    var issueNo = this.bajajuserissuesForm.get('issueNo')?.value;
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


  openDocument(){}

  refreshForm() {
    location.reload();
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

}

