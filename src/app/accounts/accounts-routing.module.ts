import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountReportUploadComponent } from './account-report-upload/account-report-upload.component';
import { AccountReportViewComponent } from './account-report-view/account-report-view.component';
// import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
// import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [

   {path:'accountreportupload',component:AccountReportUploadComponent},
   {path:'accounteportview',component:AccountReportViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
