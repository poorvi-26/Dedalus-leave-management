import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class CommonDataService {

  private userData: any = {};

  private loggedIn = new BehaviorSubject<any>(null);

  public readonly isLoggedIn$ = this.loggedIn.asObservable();

  setUserData(data:any){
    localStorage.setItem('user',JSON.stringify(data));
    this.userLoggedIn();
    this.userData = data;
  }

  getUserData(): any{
    this.userData = JSON.parse(localStorage.getItem('user')??'{}');
    return this.userData;
  }

  deleteUserData(){
    localStorage.removeItem('user');
    this.userLoggedOut();
  }

  userLoggedIn(){
    this.loggedIn.next({val: true, name: this.userData.employeeName});
  }

  userLoggedOut(){
    if(!this.getUserData()){
      this.loggedIn.next({val: false});
    } else {
      this.loggedIn.next({val: true});
    }
  }

}
