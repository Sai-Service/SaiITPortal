import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIssueLogComponent } from './user-issue-log/user-issue-log.component';
import { LoginComComponent } from './login-com/login-com.component';

const routes: Routes = [
  {path:'userIssueLog',component:UserIssueLogComponent},
  {path:'logincommonerp',component:LoginComComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpIssueRoutingModule { }
