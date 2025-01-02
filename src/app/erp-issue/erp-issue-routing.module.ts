import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIssueLogComponent } from './user-issue-log/user-issue-log.component';

const routes: Routes = [
  {path:'userIssueLog',component:UserIssueLogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpIssueRoutingModule { }
