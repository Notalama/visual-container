import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  hover: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    const dialogRef = this.dialog.open(PlusDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  mouseEnter() {
    this.hover = true;
  }
  mouseLeave() {
    this.hover = false;
  }

}

@Component({
  selector: 'app-plus-dialog',
  templateUrl: 'plus-dialog.html',
})
export class PlusDialogComponent {}
