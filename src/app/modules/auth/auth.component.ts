import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../profile/snackbar/snackbar.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  durationInSeconds = 2;
  
  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
