import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatChipsModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatGridListModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatGridListModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class MaterialModule { }
