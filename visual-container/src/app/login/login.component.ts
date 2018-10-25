import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FacebookService } from 'ngx-facebook';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

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
      console.log(res);
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
      if (res.status === 'connected') {
        this.fb.getLoginStatus().then(status => {
          console.log(res);
        });
      }
    });
  }
}
