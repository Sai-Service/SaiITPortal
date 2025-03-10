import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BajajIssueRoutingModule } from './bajaj-issue-routing.module';
import { BajajUserIssueComponent } from './bajaj-user-issue/bajaj-user-issue.component';
import { BjjcmnLoginComponent } from './bjjcmn-login/bjjcmn-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BajajsupportComComponent } from './bajajsupport-com/bajajsupport-com.component';

@NgModule({
  declarations: [
    BajajUserIssueComponent,
    BjjcmnLoginComponent,
    BajajsupportComComponent
  ],
  imports: [
    CommonModule,
    BajajIssueRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BajajIssueModule { }
