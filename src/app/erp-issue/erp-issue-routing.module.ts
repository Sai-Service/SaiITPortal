import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIssueLogComponent } from './user-issue-log/user-issue-log.component';
import { LoginComComponent } from './login-com/login-com.component';
import { ErpsupportComComponent } from './erpsupport-com/erpsupport-com.component';
import { ErpsupportreportComponent } from './erpsupportreport/erpsupportreport.component';

const routes: Routes = [
  {path:'userIssueLog',component:UserIssueLogComponent},
  {path:'logincommonerp',component:LoginComComponent},
  {path:'erpsupport',component:ErpsupportComComponent},
  { path: 'erpsupportreport', component: ErpsupportreportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpIssueRoutingModule { }
