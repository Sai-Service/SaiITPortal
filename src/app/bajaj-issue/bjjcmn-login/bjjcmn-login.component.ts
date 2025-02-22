import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { BajajIssueService } from '../bajaj-issue.service';
import { NgModule } from '@angular/core';

export interface CmnLogin{
  userName:string
  password: string;
  loginArray: any[];
}

@Component({
  selector: 'app-bjjcmn-login',
  templateUrl: './bjjcmn-login.component.html',
  styleUrl: './bjjcmn-login.component.css'
})
export class BjjcmnLoginComponent {
  userName: string;
  password: string;
  loginArray: any[];
  routerLink: any =[];
  
  currentDateList: any = [];
  constructor(private router: Router, private bjjIssueService : BajajIssueService) { }
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
this.bjjIssueService.login(this.userName, this.password).subscribe((res: any) => {
      console.log('Res', res);
      if (res.code === 200 ) {
        sessionStorage.setItem('orgId', res.obj.orgId);
        sessionStorage.setItem('userName', res.obj.userName);
        sessionStorage.setItem('orgName', res.obj.orgName);
        sessionStorage.setItem('role', res.obj.role);

        // alert(res.obj.userName)
        // this.router.navigate(['./admin/erpIssueModule/userIssueLog']);
        if (res.obj.role=='bjuser'){
          this.router.navigate(['./admin/bajajIssueModule/bajajuserIssueLog']);
          
        }
        if (res.obj.role=='bjEDP'){
            alert
            ('----WELCOME TO ADMIN PAGE----')
            this.router.navigate(['./admin/bajajIssueModule/bajajsupport']);
          }
      }
      else{
        alert(res.message)
      }
    })
     
  
  }





}