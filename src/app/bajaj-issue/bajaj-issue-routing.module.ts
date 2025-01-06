import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BajajUserIssueComponent } from './bajaj-user-issue/bajaj-user-issue.component';
import { BjlogincomComponent } from './bjlogincom/bjlogincom.component';

const routes: Routes = [
  {path:'bajajuserIssue',component:BajajUserIssueComponent},
  {path:'bjloginform',component:BjlogincomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BajajIssueRoutingModule { }
