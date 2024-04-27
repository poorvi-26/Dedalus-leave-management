import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  loadChildren: () => import ('./modules/common/common.modules').then((m) => m.CommonComponentModule)
},{
  path: '**',
  loadChildren:() => import ('./modules/common/common.modules').then((m) => m.CommonComponentModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes { }
