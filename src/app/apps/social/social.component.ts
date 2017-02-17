import {Component, OnInit} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Profile} from "./profile.interface";
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {AppsService} from "../apps.service";
import {EventCoding} from "../../forms/form-validation/event.interface";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  private profile: any;
  private uid: any;
  private myEvents = [];

  constructor(private af: AngularFire, public dialog: MdDialog, public appsService: AppsService) {}

  ngOnInit(){
    this.af.auth.subscribe(
      (auth) => {
        this.uid = auth.auth.uid;
        let data = this.af.database.object(`profiles/${this.uid}`).take(1);
        data.subscribe(
          (snap) => {
            this.profile = new Profile(snap.name, snap.email, snap.profileImgUrl);
          }
        );
        let profile = this.af.database.object(`profiles/${this.uid}`).take(1);
        profile.subscribe(
          (snap) => {
            let eventKeys = snap['myEvent'];
            for(let key in eventKeys){
              this.getEventDetail(key);
            }
          }
        )
      },
    )
  }

  getEventDetail(key){
    let event = this.af.database.object(`events/${key}`).take(1);
    event.subscribe(
      (snap) => {
        let data = new EventCoding(snap.name, snap.description, snap.image_url,
          snap.date, snap.type, snap.address, snap.latlng, snap.author);
        this.myEvents.push(data);
      }
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
    this.appsService.setProfile({name: this.profile.name, email: this.profile.email});
    this.dialogRef = this.dialog.open(profileEditorDialog, this.config);
    this.dialogRef.afterClosed().subscribe(profile => {
      if(this.profile.name == profile.name && this.profile.email == profile.email){
        return
      }else{
        this.af.database.object(`/profiles/${this.uid}`)
          .update(profile);
        this.profile.name  = profile.name;
        this.profile.email = profile.email;
      }
    })
  }

}

@Component({
  selector: 'edit-profile-dialog',
  template: `
  <h5 class="mt-0">프로필 수정</h5>
  <md-input placeholder="이름" #name type="text" [(ngModel)]="profile.name" style="width: 100%"></md-input>
  <md-input placeholder="E-MAIL" #email type="text" [(ngModel)]="profile.email" style="width: 100%"></md-input>
  <button color="accent" md-raised-button style="width: 100%" type="button"
  (click)="dialogRef.close(profile)">제출</button>`
})
export class profileEditorDialog implements OnInit {
  constructor(public dialogRef: MdDialogRef <profileEditorDialog>, public appsService: AppsService) {}

  private profile: any;

  ngOnInit(){
    this.profile = this.appsService.getProfile();
  }

}
