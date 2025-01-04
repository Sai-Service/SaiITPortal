import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpIssueRoutingModule } from './erp-issue-routing.module';
import { UserIssueLogComponent } from './user-issue-log/user-issue-log.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginComComponent } from './login-com/login-com.component';

@NgModule({
  declarations: [
    UserIssueLogComponent,
    LoginComComponent
  ],
  imports: [
    CommonModule,
    ErpIssueRoutingModule,ReactiveFormsModule,
    FormsModule

  ]
})
export class ErpIssueModule { }
