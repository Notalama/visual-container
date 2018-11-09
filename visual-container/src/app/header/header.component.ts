import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  isLoggedIn: boolean;
  constructor() { }

  ngOnInit() {
    this.userName = 'test';
  }

}
