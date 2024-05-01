import { Component, Input } from '@angular/core';
import { CommonDataService } from '../../services/common.service';
import { BASE_URL } from '../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {

  loggedIn: boolean = false;
  user: any = {};

  constructor(private commonDataService: CommonDataService){
    this.user = this.commonDataService.getUserData();
    if(!!this.user && !!this.user.employeeName){
      this.loggedIn = true;
    }
  }

  logout(){
    if(confirm('Are you sure you want to logout ?')){
      this.commonDataService.deleteUserData();
      window.location.href = BASE_URL;
    }
  }

  onDashboard(){
    let redirectUrl = ''
    if(this.loggedIn){
      if(this.user.role == 'admin')
        redirectUrl = 'admin';
      else
        redirectUrl = 'employee';
    }
    window.location.href = BASE_URL+redirectUrl;
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
  }

}
