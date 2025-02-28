import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhloguploadComponent } from './nhlogupload/nhlogupload.component';
import { NhlogdownloadComponent } from './nhlogdownload/nhlogdownload.component';


const routes: Routes = [
              { path:'nhlogupload', component: NhloguploadComponent }, 
              { path:'nhlogdownload', component: NhlogdownloadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkRoutingModule { }
