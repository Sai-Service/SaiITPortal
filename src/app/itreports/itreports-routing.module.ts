import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItcomponentComponent } from './itcomponent/itcomponent.component';
import { CeoreportsComponent } from './ceoreports/ceoreports.component';
import { ViewreportsComponent } from './viewreports/viewreports.component';

const routes: Routes = [ { path: '', component: ItcomponentComponent },
                         { path: 'ceoreports', component: CeoreportsComponent }, 
                         { path: 'viewreports', component: ViewreportsComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItreportsRoutingModule { }
