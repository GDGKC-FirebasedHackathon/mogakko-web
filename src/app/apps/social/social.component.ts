import {Component, OnInit} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Profile} from "./profile.interface";
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  private profile: any;

  constructor(private af: AngularFire, public dialog: MdDialog) {}

  ngOnInit(){
    this.af.auth.subscribe(
      (data) => {
        this.profile = new Profile(data.auth.displayName, data.auth.email, data.auth.photoURL);
        if(!this.profile.email){
          this.profile.email = "이메일을 등록해주세요."
        }
      },
    )
  }

  // profile editor dialog
  dialogRef: MdDialogRef<profileEditorDialog>;
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

  openEditor(){
    this.dialogRef = this.dialog.open(profileEditorDialog, this.config);
    this.dialogRef.afterClosed().subscribe(profile => {
      console.log(profile);
    })
  }

}

@Component({
  selector: 'edit-profile-dialog',
  template: `
  <h5 class="mt-0">프로필 수정</h5>
  <md-input placeholder="이름" #name type="text" style="width: 100%"></md-input>
  <md-input placeholder="E-MAIL" #email type="text" style="width: 100%"></md-input>
  <button color="accent" md-raised-button style="width: 100%" type="button"
  (click)="dialogRef.close()">제출</button>`
})
export class profileEditorDialog {
  constructor(public dialogRef: MdDialogRef <profileEditorDialog> ) {}
}


//
//
// import { Component } from '@angular/core';
// import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
//
// @Component({
//   selector: 'app-dialog',
//   templateUrl: './dialog.component.html',
//   styleUrls: ['./dialog.component.scss']
// })
// export class DialogComponent {
//

//
//

// }
