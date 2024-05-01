import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { CommonService } from '../../../../services/common-api.service';
import { IDateString, IDropdownItem, ITableData, ITableHeader } from '../../../../interface/common-interface';
import { ToastrService } from 'ngx-toastr';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonDataService } from '../../../../services/common.service';
import { BASE_URL } from '../../../../app.constants';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})

export class AdminDashboardComponent implements OnInit, OnDestroy{

  dropdownSettings: IDropdownSettings = {};
  requestStatusList : IDropdownItem[] = []
  selectedRequestStatus: IDropdownItem[] = [];

  tableHeaders: ITableHeader[] = [];
  tableData: any[] = [];

  showLoader: boolean = false;

  readonly status :{[key:string]:string} = {
    "underReview": "Pending",
    "approved": "Approved",
    "rejected": "Rejected"
  };

  constructor(private commonApiService: CommonService, private toastr: ToastrService, private commonDataService: CommonDataService){
  }

  ngOnInit(){
    let user = this.commonDataService.getUserData();
    if(!user || !user.role || user.role!=='admin' ){
      this.commonDataService.deleteUserData();
      window.location.href = BASE_URL;
    }
    this.requestStatusList = [
      { id: 'underReview', text: this.status['underReview'] },
      { id: 'approved', text: this.status['approved'] },
      { id: 'rejected', text: this.status['rejected']  }
    ];
    this.selectedRequestStatus = [this.requestStatusList[0]];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      closeDropDownOnSelection: true,
    };
    this.resetTable();
  }

  resetTable(){
    this.showLoader = true;
    if(this.selectedRequestStatus.length !== 0){
      let obj : any[] = [];
      this.selectedRequestStatus.forEach((req:IDropdownItem) => {
        obj.push(req.id);
      })
      this.commonApiService.listRequests({status: obj})
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
      this.showLoader = false;
    }
  }

  OnItemDeSelect(item: any) {
    if (this.selectedRequestStatus.length === 0) {
      this.selectedRequestStatus = [item];
      this.toastr.info("At least one status type should be selected");
    }else{
      this.resetTable();
    }
  }

  OnItemDeSelectAll(){
    this.selectedRequestStatus = [];
    this.resetTable();
  }

  setTableData(data:any){
    this.tableHeaders=[
      {name: 'sno', label:"S. No.", type:'text'},
      {name: 'empName', label: "Employee Name", type: 'text'},
      {name: 'days', label: "No. of Days", type: 'text'},
      {name: 'type', label: "Leave type", type: 'text'},
      {name: 'reason', label: "Reason", type: 'text'},
      {name: 'status', label: 'Status', type: 'text'},
      {name: 'action', label: "Actions", type: 'action'} ];

    this.tableData = [];
    data.forEach((request:any, index: number) => {
      let obj: ITableData={
        sno: index+1,
        requestId: request.requestId,
        empName: request.employeeName,
        days: request.days,
        type: request.type.toUpperCase(),
        reason: request.reason,
        status: this.status[request.status],
      };
      this.tableData.push(obj);
    });
  }


  onSelectAll(){
    this.selectedRequestStatus = this.requestStatusList;
    this.resetTable();
  }

  onViewRequest(requestData:any){
    window.location.href = BASE_URL+"admin/leave-report/"+requestData.requestId;
  }

  ngOnDestroy(){

  }

}
