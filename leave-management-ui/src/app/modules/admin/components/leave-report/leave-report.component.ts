import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../../../services/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonDataService } from '../../../../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'leave-report',
  templateUrl: './leave-report.component.html',
  styleUrl: './leave-report.component.css'
})


export class LeaveReportComponent implements OnInit, OnDestroy {


  constructor(
    private commonApiService: CommonService,
    private toastr: ToastrService,
    private commonDataService: CommonDataService,
    private route: ActivatedRoute
  ){ }


  showLoader: boolean = false;

  requestId: string|null = '';
  leaveTypeList: any[] = [];
  selectedLeaveType: any = {};
  tableData: any[] = [];
  dropdownSettings: any = {};
  unpaidLeaves: boolean = false;
  unpaidLeavesCount: number = 0;

  raisedOnDateString: string = '';
  endDateString: string = '';
  startDateString = '';

  readonly status :{[key:string]:string} = {
    "underReview": "Pending",
    "approved": "Approved",
    "rejected": "Rejected"
  };

  statusDisplay: string = '';

  data:any = {};

  ngOnInit() {
    this.showLoader = true;
    this.route.paramMap.subscribe(params => {
      this.requestId = params.get('id');
      this.commonApiService.getRequestReport(this.requestId).
      then((data)=>{
        console.log(data);
        this.leaveTypeList = [
          { id: 'planned', text: 'Planned' },
          { id: 'sick', text: 'Sick' },
          { id: 'casual', text: 'Casual' }
        ];
        this.tableData = [{header:'Total', id: 'total'},{header:'Remaining', id: 'remaining'}];
        this.data = data;
        this.statusDisplay = this.status[data.leaveRequest.status];
        if(data.leaveRequest.type === 'planned') this.selectedLeaveType = [this.leaveTypeList[0]];
        else if(data.leaveRequest.type === 'casual') this.selectedLeaveType = [this.leaveTypeList[2]];
        else if(data.leaveRequest.type === 'sick') this.selectedLeaveType = [this.leaveTypeList[1]];
        else this.selectedLeaveType = [{ id: data.leaveRequest.type, text: data.leaveRequest.type }];
        this.dropdownSettings ={
          singleSelection: true,
          idField: 'id',
          textField: 'text',
          closeDropDownOnSelection: true,
          disabled: true,
        };
        this.startDateString = data.leaveRequest.startDate.substring(0,10);
        this.endDateString = data.leaveRequest.endDate.substring(0,10);
        this.raisedOnDateString = data.leaveRequest.raisedOn.substring(0,10);
        this.calculateUnpaidLeaves();
        this.showLoader = false;
      },(err)=>{
        console.log(err);
        this.showLoader = false;
      })
    });
  }

  calculateUnpaidLeaves(){
    if(this.data.employee.leaves.remaining[this.selectedLeaveType[0].id]<this.data.leaveRequest.days){
      this.unpaidLeavesCount = Number(this.data.leaveRequest.days) - Number(this.data.employee.leaves.remaining[this.selectedLeaveType[0].id]);
      this.unpaidLeaves = true;
    }
  }

  approveRequest(){
    if (confirm("Are you sure you want to approve this request ?")) {
      this.data.employee.leaves.remaining[this.selectedLeaveType[0].id] = Number(this.data.employee.leaves.remaining[this.selectedLeaveType[0].id]) - Number(this.data.leaveRequest.days);
      if(Number(this.data.employee.leaves.remaining[this.selectedLeaveType[0].id]) < 0)
        this.data.employee.leaves.remaining[this.selectedLeaveType[0].id] = 0;
      this.reviewRequest({status: 'approved', requestId: this.requestId});
    }
  }

  rejectRequest(){
    if(confirm("Are you sure you want to reject this request ?"))
      this.reviewRequest({status: 'rejected', requestId: this.requestId});
  }

  reviewRequest(obj:any){
    obj.employeeId = this.data.employee.employeeID;
    obj.leaves = this.data.employee.leaves;
    this.commonApiService.reviewRequest(obj)
     .then((data)=>{
      this.toastr.success("Request "+obj.status+ " Successfully");
      setTimeout(()=>window.location.reload(), 1000);
     },
    (err)=>{
      this.toastr.error("Unable to update request status");
      setTimeout(()=>window.location.reload(), 1000);
    })
  }

  ngOnDestroy(): void {}

}
