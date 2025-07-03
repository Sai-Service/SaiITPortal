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

  latestNewsletter: string = '';

  constructor(private router: Router, private LoginSerService: LoginSerService) { }

  ngOnInit() {
  this.fetchNewsletter();
}

  login() { 
    if (this.username == undefined || this.username == "") {
      alert('Please enter valid Username !');
      return;
    }

    if (this.password == undefined || this.password == "") {
      alert('Please enter valid Password !');
      return;
    }
    // this.router.navigate(['/admin']);
    this.LoginSerService.login(this.username, this.password).subscribe((res: any) => {
      if(res.code==200){
      console.log('Res', res);
      sessionStorage.setItem('orgId',res.obj.orgId);
      sessionStorage.setItem('userName',res.obj.userName);
      sessionStorage.setItem('orgName',res.obj.orgName);
      sessionStorage.setItem('role',res.obj.role);
      if (res.obj.role=='ITADMIN'){
        this.router.navigate(['./admin/itreportsModule/ceoreports']);
        
      }

      if (res.obj.role=='common'){
        alert
        ('----WELCOME TO ADMIN PAGE----')
        // this.router.navigate(['./admin/itreportsModule/viewescalationreports']);
        this.router.navigate(['./admin/itreportsModule/saiuserhomepage']);
      }

      if (res.obj.role=='Group'){
        alert
        ('----WELCOME TO ADMIN PAGE----')
        this.router.navigate(['./admin/itreportsModule/escalationreport']);
      }

      if (res.obj.role=='CEO'){
        alert
        ('----WELCOME TO ADMIN PAGE----')
        this.router.navigate(['./admin/itreportsModule/viewreports']);
      }
      if (res.obj.role=='NH'){
        this.router.navigate(['./admin/networkModule/nhlogupload']);
        
      }

      if (res.obj.role=='NH-DN'){
            alert
            ('----WELCOME TO ADMIN PAGE----')
            this.router.navigate(['./admin/networkModule/nhlogdownload']);
          }

      if (res.obj.role=='COMMON'){
            this.router.navigate(['./admin/commonpageModule/commonform']);
            }

      if (res.obj.role=='Group1'){
              this.router.navigate(['./admin/itreportsModule/viewreportsall']);
              }

       if (res.obj.role=='Master'){
              this.router.navigate(['./admin/accountsModule/accountreportupload']);
              }

       if (res.obj.role=='Admin'){
              this.router.navigate(['./admin/accountsModule/accounteportview']);
              }
      
    }})
  
  }

fetchNewsletter() {
  this.LoginSerService.getLatestNewsletter().subscribe((res: any) => {
    if (res.code === 200 && res.obj?.length > 0) {
      this.latestNewsletter = res.obj[0].file_name;
      console.log("Loaded Newsletter File:", this.latestNewsletter);
    } else {
      console.warn("Newsletter file not found in response");
    }
  }, err => {
    console.error("Newsletter API error", err);
  });
}

  navigateToPhotos() {
    this.router.navigate(['./admin/itreportsModule/imageupload']);
    
  }

   navigateTopresentation() {
    this.router.navigate(['./admin/itreportsModule/annualpresentation']);
    
  }

}
