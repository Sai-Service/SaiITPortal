import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NetworkRoutingModule } from './network-routing.module';
import { NhloguploadComponent } from './nhlogupload/nhlogupload.component';
import { NhlogdownloadComponent } from './nhlogdownload/nhlogdownload.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NhloguploadComponent,
    NhlogdownloadComponent
  ],
  imports: [
    CommonModule,
    NetworkRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class NetworkModule { }
