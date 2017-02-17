import { Component } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 0;

  constructor(public snackBar: MdSnackBar) {}
  
  open() {
    let config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    this.snackBar.open(this.message, this.action && this.actionButtonLabel, config);
  }
}