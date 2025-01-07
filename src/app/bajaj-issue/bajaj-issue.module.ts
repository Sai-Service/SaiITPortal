import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BajajIssueRoutingModule } from './bajaj-issue-routing.module';
import { BajajUserIssueComponent } from './bajaj-user-issue/bajaj-user-issue.component';
import { BjjcmnLoginComponent } from './bjjcmn-login/bjjcmn-login.component';


@NgModule({
  declarations: [
    BajajUserIssueComponent,
    BjjcmnLoginComponent
  ],
  imports: [
    CommonModule,
    BajajIssueRoutingModule
  ]
})
export class BajajIssueModule { }
