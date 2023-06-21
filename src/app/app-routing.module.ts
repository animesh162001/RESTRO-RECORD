import { LearnComponent } from './learn/learn.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurant',
    pathMatch: 'full'

  },
  {
    path:'learn' , component: LearnComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'signup', component: SignupComponent
  },
  {
    path: 'restaurant',component: DashboardComponent
    
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
