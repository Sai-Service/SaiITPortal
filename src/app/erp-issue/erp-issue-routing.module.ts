import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIssueLogComponent } from './user-issue-log/user-issue-log.component';
import { LoginComComponent } from './login-com/login-com.component';
import { ErpsupportComComponent } from './erpsupport-com/erpsupport-com.component';
import { ErpsupportreportComponent } from './erpsupportreport/erpsupportreport.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {path:'userIssueLog',component:UserIssueLogComponent,canActivate:[authGuard]},
  {path:'logincommonerp',component:LoginComComponent},
  {path:'erpsupport',component:ErpsupportComComponent,canActivate:[authGuard]},
  { path: 'erpsupportreport', component: ErpsupportreportComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpIssueRoutingModule { }
