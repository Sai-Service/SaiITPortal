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
import { BajajIssueService } from '../bajaj-issue.service';
import { data } from 'jquery';


const MIME_TYPES :any = {
  pdf: 'application/pdf',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnc.openxmlformats-officedocument.spreadsheetxml.sheet'
};

interface uerissueslog{
  // itexecutive:string;
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
  assignedTo:string;
  city:string;
}

@Component({
  selector: 'app-bajajsupport-com',
  templateUrl: './bajajsupport-com.component.html',
  styleUrl: './bajajsupport-com.component.css'
})
export class BajajsupportComComponent {
  bajajsupportcomForm:FormGroup;
  // itexecutive:string;
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
  assignedTo:string;
  // city:string;
  srcitexecutive:string;
  srcstatus:string;
  srclocationId:number;
  srcdeptId:number;

  @ViewChild('fileInput') fileInput:any;


  public bajajlocationList:any=[];
  public alllocationlist:any=[];
  public priorityList:any=[];
  public issueTypeList:any=[];
  public departmentList:any=[];
  public ModuletList:any=[];
  public issuediscList:any=[];
  public filetypeList:any=[];
  public issuestatusList:any=[];
  public itsupportList:any=[];
  public cityList:any=[];
  bajajsupportfromsearch:any=[];
    mainimage:any=[];
    viewAllDoucmnet:any;
    isButtonDisabled = false;
    checkValidation = false;
    isIssueClosed = false;
     UpdateisButtonDisabled=false;
  
    constructor(private fb: FormBuilder, private router: Router, private service: BajajIssueService) {
      this.bajajsupportcomForm = fb.group({
    // itexecutive:[],
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
    srcitexecutive:[],
    srcstatus:[],
    srcdeptId:[],
    srclocationId:[],
    lastUpdatedBy:[],
    transLines:this.fb.array([this.UserissueLinesGroup()]),
  })
  }

  UserissueLinesGroup() {
    return this.fb.group({

      // status:[],
      remark :[],
      // assignedTo:[],
      // assignTo:[],
      assignedTo:[],
      lastUpdatedBy:['IT'],
      // fileType:[],
      // emailcc:[],
      // file:[],


    })}
   
    orderlineDetailsArray(): FormArray {
      return <FormArray>this.bajajsupportcomForm.get('transLines')
    }

    ngOnInit(): void {
      $("#wrapper").toggleClass("toggled");
      this.bajajsupportcomForm.patchValue({createdBy:sessionStorage.getItem('userName')});
      var  fileType = this.bajajsupportcomForm.get('fileType')?.value;
      if(fileType === null){
        this.bajajsupportcomForm.patchValue({fileType:'none'});
      }
  
  
      var patch = this.bajajsupportcomForm.get('transLines') as FormArray
      (patch.controls[0]).patchValue(
        {
          
          // status:'CUSTOMER WORKING',    
         
        }
      );
       
      this.service.bajajlocationList(sessionStorage.getItem('orgId'))
    .subscribe( 
      data => { 
        this.bajajlocationList = data.obj;
        console.log(this.bajajlocationList);
      }
    )

    this.service.alllocationlist()
    .subscribe( 
      data => { 
        this.alllocationlist = data.obj;
        console.log(this.alllocationlist);
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
  get f() { return this.bajajsupportcomForm.controls; }
  bajajsupportfrm(bajajsupportcomForm: any) { }



  // onSelectOuCity(event:any) {
  //   var itemType = event.target.value;
  //   var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
  //   var itemType12 = trim(itemType1);
  //   this.service.erplocationList(itemType12)
  //   .subscribe( 
  //     data => { 
  //       this.erplocationList = data.obj;
  //       console.log(this.erplocationList);
  //     }
  //   )
  // }

  transData(val :any){
    delete val.srclocationId
    delete val.srcdeptId
    delete val.srcitexecutive
    delete val.srcstatus
  


    return val;
 }

 search(){
  var  issueNo = this.bajajsupportcomForm.get('issueNo')?.value;
  var  srclocationId = this.bajajsupportcomForm.get('srclocationId')?.value;
  var  srcdeptId = this.bajajsupportcomForm.get('srcdeptId')?.value;
  var  ouId = this.bajajsupportcomForm.get('ouId')?.value;
  var  itexecutive = this.bajajsupportcomForm.get('srcitexecutive')?.value;
  var  srcstatus = this.bajajsupportcomForm.get('srcstatus')?.value;
  if (issueNo === null) { issueNo = '' }
  if (ouId === null) { ouId = '' }
  if (srclocationId === null) { srclocationId = '' }
  if (srcdeptId === null) { srcdeptId = '' }
  if (itexecutive === null) { itexecutive = '' }
  if (srcstatus === null) { srcstatus = '' }
 

  this.service.bajajissuesSearch(issueNo,ouId,srclocationId,srcdeptId,srcstatus)
  .subscribe(
    (res: any) => {
      if (res.code==200){
        alert(res.message)
      this.bajajsupportfromsearch= res.obj;
   
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
        this.bajajsupportcomForm.patchValue({issueNo:data.obj.issueNo,priority:data.obj.priority,module:data.obj.module,
          locationId:data.obj.locationId,userEmail:data.obj.userEmail,locName:data.obj.locName,userName:data.obj.userName,
          contactNo:data.obj.contactNo,issueDesc:data.obj.issueDesc,userSubject:data.obj.userSubject,subject:data.obj.subject,deptId:data.obj.deptId,
          issueType:data.obj.issueType,issueDate:data.obj.issueDate,lastUpdationDt:data.obj.lastUpdationDt,ouId:data.obj.ouId});
        this.bajajsupportcomForm.patchValue({attribute4:data.obj.issueNo});
        

        this.service.viewIssueTrnslnFn(issueNo).subscribe((res: any) => {
          if (res.code === 200) {
            alert(res.message);
            this.viewAllDoucmnet = res.obj.transLines;
            
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
    // this.isButtonDisabled = true;
    const formValue = this.transData(this.bajajsupportcomForm.getRawValue());
    this.validation();
    if (this.checkValidation === true) { 
    var issueNo = this.bajajsupportcomForm.get('issueNo')?.value;
    this.bajajsupportcomForm.patchValue({lastUpdatedBy:'IT'});
    console.log(formValue);
    let formData = new FormData();
    // formData.append('file', this.fileInput.nativeElement.files[0]); 
    if (this.fileInput?.nativeElement?.files[0]) {
      formData.append('file', this.fileInput.nativeElement.files[0]); 
    } else {
      formData.append('file', '');
    }
    formData.append('objhdMst',JSON.stringify(formValue));
    this.service.updateUserIssueLinefn(formData,issueNo).subscribe((res: any) => {
      if (res.code === 200) {
        this.isButtonDisabled = true;
        alert(res.message);
      }
      else{
        alert(res.message);
      }
    })
  }

  }

  viewDocument(){}


  refreshForm() {
    location.reload();
  }


//   openDocument(trlineId:any,filePath:any){
//     const fileName = 'download.pdf';
//     this.service.openDocumentFn(trlineId, filePath)
//       .subscribe(data => {
//         var blob = new Blob([data] , { type: 'application/pdf' },{type:''});
//         var url = URL.createObjectURL(blob);
//         var printWindow = window.open(url, '', 'width=800,height=500');
      
//         /////, { type: 'application/pdf' }

//       });
// }


openDocument(trlineId: any, filePath: any) {
  this.service.openDocumentFn(trlineId, filePath)
    .subscribe(data => {
      // Extract file extension
      const fileExtension = filePath.split('.').pop()?.toLowerCase();

      // Determine MIME type
      let mimeType = '';
      switch (fileExtension) {
        case 'pdf':
          mimeType = 'application/pdf';
          break;
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'txt':
          mimeType = 'text/plain';
          break;
        case 'doc':
        case 'docx':
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case 'xls':
        case 'xlsx':
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        default:
          mimeType = 'application/octet-stream'; // Default binary file
          break;
      }

      // Create blob and URL
      const blob = new Blob([data], { type: mimeType });
      const url = URL.createObjectURL(blob);

      // Open file in a new window or tab
      if (mimeType.startsWith('image') || mimeType === 'application/pdf') {
        // For images and PDFs, open directly in a new window
        window.open(url, '_blank', 'width=800,height=500');
      } else {
        // For other file types, trigger download
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `download.${fileExtension}`;
        anchor.click();
        URL.revokeObjectURL(url); // Clean up
      }
    });
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    alert(`File Uploaded Successfully: ${file.name}`);
  } else {
    alert("No file selected.");
  }
}

// onSelectOuCity(event:any) {
//   var itemType = event.target.value;
//   var itemType1 = itemType.substr(itemType.indexOf(': ') + 1, itemType.length);
//   var itemType12 = trim(itemType1);
//   this.service.erplocationList(itemType12)
//   .subscribe( 
//     data => { 
//       this.erplocationList = data.obj;
//       console.log(this.erplocationList);
//     }
//   )
// }

validation() {
  var status = this.bajajsupportcomForm.get('status')?.value;
  var assignTo = this.bajajsupportcomForm.get('assignTo')?.value;
  // var remark = this.bajajsupportcomForm.get('remark')?.value;
  
  
  if (status === undefined || status === null || status === '') {
    this.checkValidation = false;
    alert('Please Select Update Status .!');
    return;
  }
  if (assignTo === undefined || assignTo === null || assignTo === '') {
    this.checkValidation = false;
    alert('Please Select Issue Update/Close by Field.!');
    return;
  }
  // if (remark === undefined || remark === null || remark === '') {
  //   this.checkValidation = false;
  //   alert('Please Enter Update.!');
  //   return;
  // }
  
  this.checkValidation = true
}

closeIssue() {
  const issueNo = this.bajajsupportcomForm.get('issueNo')?.value;
  if (!issueNo) {
    alert("No issue selected to close.");
    return;
  }

  // Mark status as CLOSED
  this.bajajsupportcomForm.patchValue({ status: 'CLOSED' });

  const formValue = this.transData(this.bajajsupportcomForm.getRawValue());

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
  this.bajajsupportcomForm.disable();
  this.UpdateisButtonDisabled = true;
  this.isButtonDisabled = true;
}


}