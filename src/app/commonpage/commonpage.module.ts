import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonpageRoutingModule } from './commonpage-routing.module';
import { CommonformComponent } from './commonform/commonform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CommonformComponent
  ],
  imports: [
    CommonModule,
    CommonpageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CommonpageModule { }
