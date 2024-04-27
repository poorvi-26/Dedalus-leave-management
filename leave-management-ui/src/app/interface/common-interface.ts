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
  empID: string,
  empName: string,
  startDate: IDateString,
  endDate: IDateString,
  days: number,
  type: string,
  reason: string,
  actions?: any
}

export interface IDateString{
  month:string,
  date:string,
  year:string
}
