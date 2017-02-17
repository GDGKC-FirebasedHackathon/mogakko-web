import {Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AngularFire} from "angularfire2";
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import {Router} from "@angular/router";
import {EventCoding} from "./event.interface";

declare var daum : any;
declare var data : any;
declare var pagination: any;
declare var place: any;

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {

  public form: FormGroup;
  private uploadLoading: boolean = false;

  firebase: any;
  constructor(private af: AngularFire, private router: Router,
              private fb: FormBuilder, @Inject(FirebaseApp) firebase: any){
    this.firebase = firebase
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
      date: [null, Validators.compose([Validators.required, CustomValidators.date])],
      image_url: [null]
    });

  }


  uploadListener(event){
    if(event.target.files[0]){
      console.log(event.target.files[0]);
      this.uploadLoading = true;
      this.uploadImage(this.generateUUID(), event.target.files[0]).then(
        (data) => {
          this.form.value.image_url = data;
          console.log(data)
          this.uploadLoading = false;
        }
      );
    }else{

    }

  }


  uploadImage(name, data) {
    let promise = new Promise((res,rej) => {
      let fileName = name + ".jpg";
      let uploadTask = firebase.storage().ref(`/events/${fileName}`).put(data);
      uploadTask.on('state_changed', function(snapshot) {
      }, function(error) {
        rej(error);
      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        res(downloadURL);
      });
    });
    return promise;
  }


  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };

  onSubmit(){
    let event = this.form.value;
    let data = new EventCoding(event.name, event.description, event.image_url, event.date);
    console.log(data);
    this.af.database.object(`/events/${this.generateUUID()}`)
      .update(data);
    this.router.navigate(['/apps', 'profile']);
  }



}
