import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BajajUserIssueComponent } from './bajaj-user-issue/bajaj-user-issue.component';
import { BajajsupportComComponent } from './bajajsupport-com/bajajsupport-com.component';
import { BjjcmnLoginComponent } from './bjjcmn-login/bjjcmn-login.component';

const routes: Routes = [
   {path:'bajajuserIssueLog',component:BajajUserIssueComponent},
   {path:'bajajloginform',component:BjjcmnLoginComponent},
   {path:'bajajsupport',component:BajajsupportComComponent}    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BajajIssueRoutingModule { }