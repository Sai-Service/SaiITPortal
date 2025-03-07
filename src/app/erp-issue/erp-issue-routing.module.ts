import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIssueLogComponent } from './user-issue-log/user-issue-log.component';
import { LoginComComponent } from './login-com/login-com.component';
import { ErpsupportComComponent } from './erpsupport-com/erpsupport-com.component';
import { ErpsupportreportComponent } from './erpsupportreport/erpsupportreport.component';
import { erpauthGuard } from './erpauth.guard';

const routes: Routes = [
  {path:'userIssueLog',component:UserIssueLogComponent,canActivate:[erpauthGuard]},
  {path:'logincommonerp',component:LoginComComponent},
  {path:'erpsupport',component:ErpsupportComComponent,canActivate:[erpauthGuard]},
  { path: 'erpsupportreport', component: ErpsupportreportComponent,canActivate:[erpauthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpIssueRoutingModule { }
