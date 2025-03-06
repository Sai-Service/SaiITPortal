import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itcomponent',
  templateUrl: './itcomponent.component.html',
  styleUrl: './itcomponent.component.css'
})
export class ItcomponentComponent implements OnInit {
  // username: string = '';
  userName: string = ''; 
  orgId: number = 0;    
  orgName: string = '';  
  role: string = '';  

  // ngOnInit(): void {
  //   this.username = localStorage.getItem('username') || '';
  // }

  ngOnInit() {
    // Retrieve values with null checks
    const storedUsername = sessionStorage.getItem('username');
    const storedOrgId = sessionStorage.getItem('orgId');
    const storedOrgName = sessionStorage.getItem('orgName');
    const storedRole = sessionStorage.getItem('role');


    // Assign with null checks
    this.userName = storedUsername || '';
    this.orgId = storedOrgId ? Number(storedOrgId) : 0;
    this.orgName = storedOrgName || '';
    this.role = storedRole || '';


  }

}
