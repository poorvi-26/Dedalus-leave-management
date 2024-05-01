import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CommonModule } from "@angular/common";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { DataTablesModule } from "angular-datatables";
import { LeaveReportComponent } from "./components/leave-report/leave-report.component";


const routes : Routes = [{
  path: '',
  component: AdminDashboardComponent
},{
  path: 'leave-report/:id',
  component: LeaveReportComponent,
}]

@NgModule({
  declarations:[AdminDashboardComponent, LeaveReportComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    NgMultiSelectDropDownModule,
    CommonModule, DataTablesModule],
  providers: []
})


export class AdminModule {}
