export interface IDropdownItem{
  id: string|number,
  text: string
}


export interface ITableHeader{
  name: string,
  label: string,
  type: string,
}

export interface ITableData{
  sno: number,
  requestId: string,
  empName: string,
  status: string,
  days: number,
  type: string,
  reason: string,
}



export interface LeaveRequestReport {
  requestId: number,
  empID: string,
  empName: string,
  designation: string,
  department: string,
  status: string,
  type: string,
  startDate: string,
  endDate: string,
  days: number,
  leaveData: {[key:string]:{'planned':number, 'sick': number, 'casual':number }},
  reason: string,

}

export interface IDateString{
  month:string,
  date:string,
  year:string
}
