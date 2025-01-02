import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpIssueRoutingModule } from './erp-issue-routing.module';
import { UserIssueLogComponent } from './user-issue-log/user-issue-log.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserIssueLogComponent
  ],
  imports: [
    CommonModule,
    ErpIssueRoutingModule,ReactiveFormsModule,
    FormsModule

  ]
})
export class ErpIssueModule { }
