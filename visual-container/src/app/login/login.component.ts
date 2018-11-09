import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  userStatus: LoginResponse;
  constructor(
    private fb: FacebookService,
    private http: HttpClient,
    private router: Router) { }

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
        this.router.navigateByUrl('main').then(
          success => console.log('login success', success),
          reject => {
            console.log('login rejected', reject);
            this.router.navigateByUrl('login');
          }
        );
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
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(
      environment.URL + '/auth?access_token=masterKey',
      { email: this.email.value, password: this.password.value, id: '5bd97a6bd734ca2d14177377' },
      { headers: headers }).subscribe(e => console.log(e));
  }
  fbLogin() {
    this.fb.login().then(res => {
      console.log(res);
      this.userStatus = res;
      if (res.status === 'connected') {
        this.setCookie(res);
        this.router.navigateByUrl('main').then(
          success => console.log('login success', success),
          reject => {
            console.log('login rejected', reject);
            this.router.navigateByUrl('login');
          }
        );
      }
    });
  }
  setCookie(userData: LoginResponse) {
    const date = new Date;
    date.setDate(date.getDate() + 1);
    document.cookie = 'userID=' + userData.authResponse.userID + '; path=/; expires=' + date.toUTCString();
  }
}
