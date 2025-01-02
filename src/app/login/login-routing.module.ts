import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPgComponent } from './login-pg/login-pg.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'login', component: LoginPgComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
