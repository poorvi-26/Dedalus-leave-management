import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class CommonService {

  private baseUrl = "";
  private loginApi = "";
  private addNewRequestPath = "";
  private listAllRequestPath = "";
  private getRequestReportPath = "";
  private reviewRequestPath = "";

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "http://localhost:3000/";
    this.loginApi = "employee/login";
    this.addNewRequestPath = "leave-requests/add-new";
    this.listAllRequestPath = "leave-requests/list-all";
    this.getRequestReportPath = "leave-requests/get-request";
    this.reviewRequestPath = "leave-requests/review";
  }


  private get(url:string){
    return this.httpClient.get(url);
  }

  private post(url:string, payload:any){
    return this.httpClient.post(url, payload);
  }

  private put(url:string, payload: any){
    return this.httpClient.put(url, payload);
  }

  public login(data:any): Promise<any>{
    return firstValueFrom(this.post(
      this.baseUrl+this.loginApi,data
    ));
  }

  public addNewRequest(data: any): Promise<any>{
    return firstValueFrom(this.post(this.baseUrl+this.addNewRequestPath, data));
  }

  public listRequests(data:any): Promise<any>{
    return firstValueFrom(this.post(this.baseUrl+this.listAllRequestPath,data));
  }

  public getRequestReport(data:any): Promise<any>{
    return firstValueFrom(this.get(this.baseUrl+this.getRequestReportPath+"/"+data));
  }

  public reviewRequest(data:any): Promise<any>{
    return firstValueFrom(this.put(this.baseUrl+this.reviewRequestPath, data));
  }


}
