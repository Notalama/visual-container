import { environment } from './../../environments/environment';
import { FacebookService } from 'ngx-facebook';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  userId: string;
  constructor(private fb: FacebookService, private http: HttpClient) { }

  ngOnInit() {
    const initParams = {
      appId: environment.appId,
      cookie: true,
      xfbml: false,
      version: 'v3.2'
    };
    this.fb.init(initParams);
  }

  checkStatus() {
    this.fb.getLoginStatus().then(res => {
      console.log(res);
      this.userId = res.authResponse.userID;
      this.fb.api('/' + this.userId, 'get').then(result => {
        console.log(result);
      });
    });
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  register() {
    this.fb.login().then(res => {
      console.log(res);
      if (res.status === 'connected') {
        const payload = {
          email: this.email.value,
          password: this.password.value,
          token: res.authResponse.accessToken,
          name: '',
          id: res.authResponse.userID,
          role: 'admin'
        };
        this.fb.api('/' + this.userId, 'get').then(result => {
          payload.name = result.name;
          console.log(payload);
          this.http.post(environment.URL + '/users?access_token=masterKey', payload)
            .subscribe(val => console.log(val),
              e => console.log(e));
        });
      }
    });
  }
}
