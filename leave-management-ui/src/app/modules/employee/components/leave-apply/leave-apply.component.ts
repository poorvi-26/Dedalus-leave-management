import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { IDropdownItem } from '../../../../interface/common-interface';
import { CommonService } from '../../../../services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonDataService } from '../../../../services/common.service';
import { BASE_URL } from '../../../../app.constants';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrl: './leave-apply.component.css'
})
export class LeaveApplyComponent implements OnInit, OnDestroy {

  leaveTypeList: IDropdownItem[]= [];
  selectedLeaveType: IDropdownItem[]= [];
  dropdownSettings: IDropdownSettings = {};


  startDate: Date = new Date();
  endDate: Date = new Date();
  minStartDate : Date = new Date();

  showEndDateError: boolean = false;
  showStartDateError: boolean = false;

  reason: string = '';
  days: number = 1;


  constructor(private commonApiService: CommonService, private toastr: ToastrService, private commonDataService: CommonDataService){ }

  ngOnInit() {
    let user = this.commonDataService.getUserData();
    if(!user || !user.role || user.role!=='employee' ){
      this.commonDataService.deleteUserData();
      window.location.href = BASE_URL;
    }
    this.leaveTypeList = [
      { id: 'planned', text: 'Planned Leave' },
      { id: 'sick', text: 'Sick Leave' },
      { id: 'casual', text: 'Casual Leave' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      closeDropDownOnSelection: true,
    };
  }


  formatDate(date: Date): string {
    return date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '';
  }

  set startDateString(e:any){
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.startDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get startDateString(){
    return this.startDate.toISOString().substring(0, 10);
  }

  set endDateString(e:any){
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1]-1, e[2]));
    this.endDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get endDateString(){
    return this.endDate.toISOString().substring(0, 10);
  }

  onstartDateChange(){
    if(this.startDate<this.minStartDate){
      this.showStartDateError = true;
    } else {
    this.endDateString = this.startDateString;
    this.days = 1;
    this.showStartDateError = false;
    }

  }

  onEndDateChange(){
    if(this.endDate<this.startDate){
      this.showEndDateError = true;
      this.days = 0;
    }else{
      this.days = ((this.endDate.getTime()-this.startDate.getTime() )/ (1000 * 60 * 60 * 24)) + 1;
      this.showEndDateError = false;
    }
  }

  submit(){
    let user = this.commonDataService.getUserData();
    let empID = !!user ? user.employeeID : '';
    let obj:any = {
      type: this.selectedLeaveType[0].id,
      startDate: this.startDateString,
      endDate: this.endDateString,
      days: this.days,
      reason : !!this.reason? this.reason : "",
      empID : empID
    }
    this.commonApiService.addNewRequest(obj).then(
      (data:any)=>{
        console.log("added");
        this.selectedLeaveType = [];
        this.startDate = new Date();
        this.endDate = new Date();
        this.reason = '';
        this.days = 1;
        this.toastr.success("Leave applied Successfully.");
      },
      (err)=>{
        console.log("error");
        this.toastr.error("Unable to raise request.");
      })
  }


  ngOnDestroy(): void {

  }

}
