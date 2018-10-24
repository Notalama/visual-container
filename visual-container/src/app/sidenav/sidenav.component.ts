import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  input = false;
  titles = [];
  value = '';

  constructor() { }

  ngOnInit() {
  }

  openInput() {
    this.input = true;
  }
  cancel() {
    this.input = false;
  }
  add(value: string) {
    this.titles.push(this.value = value);
  }

}
