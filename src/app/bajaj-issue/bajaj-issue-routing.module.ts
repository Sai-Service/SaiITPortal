import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BajajUserIssueComponent } from './bajaj-user-issue/bajaj-user-issue.component';

const routes: Routes = [
  {path:'bajajuserIssue',component:BajajUserIssueComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BajajIssueRoutingModule { }
