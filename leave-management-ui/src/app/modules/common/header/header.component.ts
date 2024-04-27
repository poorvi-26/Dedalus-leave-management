import { Component, Input } from '@angular/core';
import { CommonDataService } from '../../../services/common.service';
import { Subject, takeUntil } from 'rxjs';
import { BASE_URL } from '../../../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {

  loggedIn: boolean = false;

  private ngInitUnsubscribe = new Subject<void>();

  name: string = '';

  constructor(private commonDataService: CommonDataService){
    let user = this.commonDataService.getUserData();
    if(!!user && !!user.employeeName){
      this.loggedIn = true;
      this.name = user.employeeName;
    }
  }

  logout(){
    if(confirm('Are you sure you want to logout ?')){
      this.commonDataService.deleteUserData();
      window.location.href = BASE_URL;
    }
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
  }

}
