import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { LoginSerService } from '../login-ser.service';



export interface IItem {
  username: string;
  password: string;
}


@Component({
  selector: 'app-login-pg',
  templateUrl: './login-pg.component.html',
  styleUrl: './login-pg.component.css'
})
export class LoginPgComponent {

  username: string;
  password: string;
  loginArray: any[];
  divisionId: any[];
  users: any[];
  lstcomments1: any[];
  divisionCode: string;
  ticketNo: string;
  loginName:string;
  locId:number;
  dmsLoc:string;
  divType:string;

  currentDateList: any = [];

  constructor(private router: Router, private LoginSerService: LoginSerService) { }


  login() {
    // alert('hiiiii')
    // alert(this.username+'-----'+this.password)
   
    if (this.username == undefined || this.username == "") {
      alert('Please enter valid Username !');
      return;
    }

    if (this.password == undefined || this.password == "") {
      alert('Please enter valid Password !');
      return;
    }
    this.router.navigate(['/admin']);
    // this.LoginSerService.login(this.username, this.password).subscribe((res: any) => {
    //   console.log('Res', res);
    //   if (res.code === 200) {
    //     this.router.navigate(['/admin']);
    //   }
    //   else{
    //     alert(res.message)
    //   }
    // })
     
  
  }

}