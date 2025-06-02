import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountReportUploadComponent } from './account-report-upload/account-report-upload.component';
import { AccountReportViewComponent } from './account-report-view/account-report-view.component';


@NgModule({
  declarations: [
    AccountReportUploadComponent,
    AccountReportViewComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountsModule { }
