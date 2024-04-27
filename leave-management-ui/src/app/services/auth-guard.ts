import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CommonDataService } from "./common.service";
import { Observable } from "rxjs";
import { BASE_URL } from "../app.constants";

@Injectable({providedIn: 'root'})

export class AuthGuard {

  constructor(private commonDataService: CommonDataService) {}

  canActivateFn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(state);
  }

  private checkAuthentication(state: RouterStateSnapshot): boolean | UrlTree {
    let user = this.commonDataService.getUserData();
    if (user.get) {
      if(user.role == 'admin'){
        if(state.url.includes('admin')) return true;
        setTimeout( () => (window.location.href= BASE_URL+"admin"), 1000);
        return false;
      }else if(user.role == 'employee'){
        if(state.url.includes('employee')) return true;
        setTimeout( () => (window.location.href= BASE_URL+'employee'), 1000);
        return false;
      } else {
        setTimeout( () => (window.location.href= BASE_URL), 1000);
        return false;
      }
    } else {
      // Redirect to the login page if the user is not authenticated
      setTimeout( () => (window.location.href= BASE_URL), 1000);
      return false;
    }
  }
}
