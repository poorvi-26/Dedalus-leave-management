import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonService } from '../../../../services/common-api.service';
import { IDateString, IDropdownItem, ITableData, ITableHeader } from '../../../../interface/common-interface';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  encapsulation: ViewEncapsulation.None
})

export class AdminDashboardComponent implements OnInit, OnDestroy{

  dropdownSettings: IDropdownSettings = {};
  requestStatusList : IDropdownItem[] = []
  selectedRequestStatus: IDropdownItem[] = [];

  tableHeaders: ITableHeader[] = [];
  tableData: any[] = [];

  showLoader: boolean = false;

  constructor(private commonApiService: CommonService, private toastr: ToastrService){
  }

  ngOnInit(){
    this.requestStatusList = [
      { id: 'underReview', text: 'Pending' },
      { id: 'approved', text: 'Approved' },
      { id: 'rejected', text: 'Rejected' }
    ];
    this.selectedRequestStatus = [this.requestStatusList[0]];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'text',
      closeDropDownOnSelection: true,
    };
    this.resetTable();
  }

  resetTable(){
    this.showLoader = true;
    if(this.selectedRequestStatus.length !== 0){
      let obj: any = {status: this.selectedRequestStatus[0].id};
      this.commonApiService.listRequests(obj)
        .then((data)=>{
          console.log(data);
          this.setTableData(data);
          this.showLoader = false;
        },
        (err)=>{
          console.log(err);
          this.showLoader = false;
        }
      );
    } else {
      this.toastr.error("Select a Status, to get all request under that status");
    }
  }

  setTableData(data:any){
    this.tableHeaders=[
      {name: 'sno', label:"S. No.", type:'text'},
      {name: 'empID', label: "Employee ID", type: 'text'},
      {name: 'empName', label: "Employee Name", type: 'text'},
      {name: 'startDate', label: "Start Date", type: 'date'},
      {name: 'endDate', label: "End Date", type: 'date'},
      {name: 'days', label: "No. of Days", type: 'text'},
      {name: 'type', label: "Leave type", type: 'text'},
      {name: 'reason', label: "Reason", type: 'text'} ];
    if(this.selectedRequestStatus[0].id==='underReview'){
      this.tableHeaders.push({name: 'actions', label: "Actions", type: 'actions'});
    }

    this.tableData = [];
    data.forEach((request:any, index: number) => {
      let obj: ITableData={
        sno: index+1,
        requestId: request.requestId,
        empID: request.employeeId,
        empName: request.employeeName,
        startDate: this.getInDateFormat(request.startDate.substring(0,10)),
        endDate: this.getInDateFormat(request.endDate.substring(0,10)),
        days: request.days,
        type: request.type.toUpperCase(),
        reason: request.reason
      };
      if(this.selectedRequestStatus[0].id=='underReview'){
        obj.actions = true;
      }
      this.tableData.push(obj);
    });
  }



  // expected date in format YYYY-MM-DD
  getInDateFormat(date:string): IDateString{
    if(!!date){
      let obj: any = date.split('-');
      return {month: obj[1], date: obj[2], year: obj[0]};
    } return {month:'00',date:'00', year:'0000'};
  }

  approveRequest(row: any){
    console.log('approve', row);
    if (confirm("Are you sure you want to approve this request ?")) {
      this.reviewRequest({status: 'approved', requestId: row.requestId});
    }
  }

  rejectRequest(row:any){
    console.log('reject', row);
    if(confirm("Are you sure you want to reject this request ?"))
      this.reviewRequest({status: 'rejected', requestId: row.requestId});
  }

  reviewRequest(obj:any){
    this.commonApiService.reviewRequest(obj)
     .then((data)=>{
      this.toastr.success("Request "+obj.status+ " Successfully");
      this.tableHeaders = [];
      this.tableData = [];
      this.resetTable();
     },
    (err)=>{
      this.toastr.error("Unable to update request status");
      this.resetTable();
    })
  }

  ngOnDestroy(){

  }

}
