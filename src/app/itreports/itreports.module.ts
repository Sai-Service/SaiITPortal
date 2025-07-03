import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItreportsRoutingModule } from './itreports-routing.module';
import { ItcomponentComponent } from './itcomponent/itcomponent.component';
import { CeoreportsComponent } from './ceoreports/ceoreports.component';
import { ViewreportsComponent } from './viewreports/viewreports.component';
import { ViewescalationreportsComponent } from './viewescalationreports/viewescalationreports.component';
import { EscalationreportComponent } from './escalationreport/escalationreport.component';
import { SaiuserhomepageComponent } from './saiuserhomepage/saiuserhomepage.component';
import { ViewreportsallComponent } from './viewreportsall/viewreportsall.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { AnnualpresentationComponent } from './annualpresentation/annualpresentation.component';




@NgModule({
  declarations: [
    ItcomponentComponent,
    CeoreportsComponent,
    ViewreportsComponent,
    ViewescalationreportsComponent,
    EscalationreportComponent,
    SaiuserhomepageComponent,
    ViewreportsallComponent,
    ImageuploadComponent,
    AnnualpresentationComponent,
  ],
  imports: [
    CommonModule,
    ItreportsRoutingModule,
    FormsModule
  ]
})
export class ItreportsModule { }
