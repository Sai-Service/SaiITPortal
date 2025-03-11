import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItreportsRoutingModule } from './itreports-routing.module';
import { ItcomponentComponent } from './itcomponent/itcomponent.component';
import { CeoreportsComponent } from './ceoreports/ceoreports.component';
import { ViewreportsComponent } from './viewreports/viewreports.component';
import { ViewescalationreportsComponent } from './viewescalationreports/viewescalationreports.component';
import { EscalationreportComponent } from './escalationreport/escalationreport.component';



@NgModule({
  declarations: [
    ItcomponentComponent,
    CeoreportsComponent,
    ViewreportsComponent,
    ViewescalationreportsComponent,
    EscalationreportComponent,
  ],
  imports: [
    CommonModule,
    ItreportsRoutingModule,
    FormsModule
  ]
})
export class ItreportsModule { }
