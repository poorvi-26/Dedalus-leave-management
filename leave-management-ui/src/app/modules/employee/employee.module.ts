import { NgModule } from "@angular/core";
import { LeaveApplyComponent } from "./components/leave-apply/leave-apply.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CommonModule } from "@angular/common";


const routes : Routes = [{
  path: '',
  component: LeaveApplyComponent
}]

@NgModule({
  declarations:[LeaveApplyComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    NgMultiSelectDropDownModule,
    CommonModule],
  providers: []
})


export class EmployeeModule {}
