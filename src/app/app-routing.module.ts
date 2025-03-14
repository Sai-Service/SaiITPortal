import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // { path: 'itrepo', loadChildren: () => import('./itreports/itreports.module').then(m => m.ItreportsModule) },
  {path :'login',loadChildren:()=> import('./login/login.module').then(m=> m.LoginModule)},
  { path : '' ,redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
