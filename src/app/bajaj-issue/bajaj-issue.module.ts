import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BajajIssueRoutingModule } from './bajaj-issue-routing.module';
import { BajajUserIssueComponent } from './bajaj-user-issue/bajaj-user-issue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BajajUserIssueComponent
  ],
  imports: [
    CommonModule,
    BajajIssueRoutingModule,
    ReactiveFormsModule,
    FormsModule
  
  ]
})
export class BajajIssueModule { }
