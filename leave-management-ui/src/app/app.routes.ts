import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';

const routes: Routes =[
{
  path: 'employee',
  loadChildren:() => import ('./modules/employee/employee.module').then((m)=>m.EmployeeModule)
},
{
  path: 'admin',
  loadChildren:() => import ('./modules/admin/admin.module').then((m)=> m.AdminModule)
},
{
  path: '',
  component: LoginComponent
},
{
  path:'**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes { }
