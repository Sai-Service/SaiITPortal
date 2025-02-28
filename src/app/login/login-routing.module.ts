import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPgComponent } from './login-pg/login-pg.component';
import { NhloguploadComponent } from '../network/nhlogupload/nhlogupload.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'login', component: LoginPgComponent},
  { path:'nhupload', component: NhloguploadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
