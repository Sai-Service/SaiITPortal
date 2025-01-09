import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ErpIssueService } from '../erp-issue.service';
import { NgModule } from '@angular/core';

export interface CmnLogin{
  userName:string
  password: string;
  loginArray: any[];
}

@Component({
  selector: 'app-login-com',
  templateUrl: './login-com.component.html',
  styleUrl: './login-com.component.css'
})
export class LoginComComponent {
  userName: string;
  password: string;
  loginArray: any[];
  routerLink: any =[];
  
  currentDateList: any = [];
  constructor(private router: Router, private ErpIssueService : ErpIssueService) { }
  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }

  login() {
   
    if (this.userName == undefined || this.userName == "") {
      alert('Please enter valid Username !');
      return;
    }
    if (this.password == undefined || this.password == "") {
      alert('Please enter valid Password !');
      return;
    }
this.ErpIssueService.login(this.userName, this.password).subscribe((res: any) => {
      console.log('Res', res);
      if (res.code === 200 ) {
        sessionStorage.setItem('orgId', res.obj.orgId);
        sessionStorage.setItem('userName', res.obj.userName);
        sessionStorage.setItem('orgName', res.obj.orgName);
        
        alert(res.obj.userName)
        // this.router.navigate(['./admin/erpIssueModule/userIssueLog']);
        if (res.obj.userName=='MUMEDP'){
            this.router.navigate(['./admin/erpIssueModule/userIssueLog']);
            
          }
          if (res.obj.userName=='MUMBAI'){
            alert
            ('----WELCOME TO ADMIN PAGE----')
            this.router.navigate(['./admin/erpIssueModule/erpsupport']);
          }
      }
      else{
        alert(res.message)
      }
    })
     
  
  }





}
