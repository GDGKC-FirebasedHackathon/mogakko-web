import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  dialogRef: MdDialogRef<JazzDialog>;
  lastCloseResult: string;
  config: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  constructor(public dialog: MdDialog) {}

  open() {
    this.dialogRef = this.dialog.open(JazzDialog, this.config);
    this.dialogRef.afterClosed().subscribe(result => {
      this.lastCloseResult = result;
      this.dialogRef = null;
    });
  }
}

@Component({
  selector: 'demo-jazz-dialog',
  template: `
  <h5 class="mt-0">Maecenas faucibus mollis interdum.</h5>
  <md-input placeholder="How much?" #howMuch type="number" style="width: 100%;"></md-input>
  <p> {{ jazzMessage }} </p>
  <button md-button type="button" (click)="dialogRef.close(howMuch.value)">Close dialog</button>`
})
export class JazzDialog {
  jazzMessage = 'Jazzy jazz jazz';
  constructor(public dialogRef: MdDialogRef <JazzDialog> ) {}
}