import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { contains } from 'jquery';

@Component({
  selector: 'app-admin-pg',
  templateUrl: './admin-pg.component.html',
  styleUrl: './admin-pg.component.css'
})
export class AdminPgComponent {
  public isCollapsed = true;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    $("#wrapper").toggleClass("toggled");
  }


  
  dashboard() {
    this.router.navigate(['/admin']);
  }

  logout(){
    this.router.navigate(['/login']);
    // if(sessionStorage.getItem('role')=='User'){this.router.navigate(['./admin/erpIssueModule/logincommonerp']);}
    // if(sessionStorage.getItem('role')=='IT'){this.router.navigate(['./admin/erpIssueModule/loginCommon']);}

    this.router.navigate(['./admin/erpIssueModule/logincommonerp']);
    // this.router.navigate(['/admin/bajajIssueModule/bajajloginform'])
    

  }
}
