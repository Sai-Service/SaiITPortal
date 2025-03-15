import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItcomponentComponent } from './itcomponent/itcomponent.component';
import { CeoreportsComponent } from './ceoreports/ceoreports.component';
import { ViewreportsComponent } from './viewreports/viewreports.component';
import { ViewescalationreportsComponent } from './viewescalationreports/viewescalationreports.component';
import { EscalationreportComponent } from './escalationreport/escalationreport.component';
import { SaiuserhomepageComponent } from './saiuserhomepage/saiuserhomepage.component';

const routes: Routes = [ { path: '', component: ItcomponentComponent },
                         { path: 'ceoreports', component: CeoreportsComponent }, 
                         { path: 'viewreports', component: ViewreportsComponent }, 
                         { path: 'viewescalationreports', component: ViewescalationreportsComponent }, 
                         { path: 'escalationreport', component: EscalationreportComponent }, 
                         { path:'saiuserhomepage',component:SaiuserhomepageComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItreportsRoutingModule { }
