import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common-api.service';
import { BASE_URL } from '../../app.constants';
import { CommonDataService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit, OnDestroy {


  username: string = "";
  password: string = "";
  disableLogin: boolean = false;

  constructor(private commonApiService: CommonService, private commonDataService: CommonDataService){

  }


  login(){
    this.disableLogin = true;
    console.log(this.username);
    console.log(this.password);
    let obj:any = {
      emailID: this.username,
      password: this.password
    }
    this.commonApiService.login(obj).then(
      (data:any) => {
        console.log(data);
        this.commonDataService.setUserData(data);
        this.disableLogin = false;
        if(data.role == 'admin'){
          window.location.href = BASE_URL+'admin'
        }else {
          window.location.href = BASE_URL+"employee";
        }
      },
      (err) =>{
        console.log(err);
        this.disableLogin = false;
      }
    );
  }

  ngOnInit(): void {
    let user = this.commonDataService.getUserData();

    if(!!user && !!user.employeeID){
      this.commonDataService.deleteUserData();
      window.location.href = BASE_URL;
    }
  }

  ngOnDestroy(): void {

  }

}
