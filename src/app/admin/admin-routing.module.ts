import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPgComponent } from './admin-pg/admin-pg.component';

const routes: Routes = [
  {
    path: '', component: AdminPgComponent, children: [
      {
        path: 'erpIssueModule',
        loadChildren: () => import('../erp-issue/erp-issue.module').then(mod => mod.ErpIssueModule)
      },
      {
        path: 'bajajIssueModule',
        loadChildren: () => import('../bajaj-issue/bajaj-issue.module').then(mod => mod.BajajIssueModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
