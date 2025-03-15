import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saiuserhomepage',
  templateUrl: './saiuserhomepage.component.html',
  styleUrl: './saiuserhomepage.component.css'
})
export class SaiuserhomepageComponent {

  userName: string = ''; 
  orgId: number = 0;    
  orgName: string = '';  
  role: string = '';

  constructor(private router: Router) {}


  ngOnInit() {
    const storedUsername = sessionStorage.getItem('userName');
    const storedOrgId = sessionStorage.getItem('orgId');
    const storedOrgName = sessionStorage.getItem('orgName');
    const storedRole = sessionStorage.getItem('role');


    this.userName = storedUsername || '';
    this.orgId = storedOrgId ? Number(storedOrgId) : 0;
    this.orgName = storedOrgName || '';
    this.role = storedRole || '';


  }


  navigateToReports() {
    this.router.navigate(['./admin/itreportsModule/viewescalationreports']);
  }

}
