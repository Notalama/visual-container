import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FacebookService, LoginResponse } from 'ngx-facebook';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  userStatus: LoginResponse;
  constructor(private fb: FacebookService) { }

  ngOnInit() {
    const initParams = {
      appId: environment.appId,
      cookie: true,
      xfbml: false,
      version: 'v3.2'
    };
    this.fb.init(initParams);
    this.fb.getLoginStatus().then(res => {
      if (res.status === 'connected') {
        console.log(res);
        // this.setCookie(res);
      }
    }).catch(e => {
      throw e;
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  login() {
    this.fb.login().then(res => {
      console.log(res);
        this.userStatus = res;
      if (res.status === 'connected') {
        this.setCookie(res);
      }
    });
  }
  setCookie(userData: LoginResponse) {
    const date = new Date;
    date.setDate(date.getDate() + 1);
    document.cookie = 'userID=' + userData.authResponse.userID + '; path=/; expires=' + date.toUTCString();
  }

  test() {
    this.fb.api('/me' + '?fields=gender,email,name', 'get')
      .then(this.userData)
      .catch(e => console.log(e));
  }
  userData(userResponse) {
    console.log(userResponse);
  }
}
