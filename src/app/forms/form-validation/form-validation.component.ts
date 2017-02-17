import {Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AngularFire} from "angularfire2";
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import {Router} from "@angular/router";
import {EventCoding} from "./event.interface";


@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {

  public form: FormGroup;
  private uploadLoading: boolean = false;


  lat: number = 37.507797;
  lng: number = 127.045273;
  zoom: number = 15;

  styles: any = [{
    featureType: 'all',
    stylers: [{
      saturation: -80
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{
      hue: '#00ffee'
    }, {
      saturation: 50
    }]
  }, {
    featureType: 'poi.business',
    elementType: 'labels',
    stylers: [{
      visibility: 'off'
    }]
  }];

  private uid : any;

  firebase: any;
  constructor(private af: AngularFire, private router: Router,
              private fb: FormBuilder, @Inject(FirebaseApp) firebase: any){
    this.firebase = firebase
  }

  ngOnInit() {
    this.af.auth.subscribe(
      (auth) => {
        this.uid = auth.auth.uid;
      }
    );

    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])],
      date: [null, Validators.compose([Validators.required, CustomValidators.date])],
      image_url: [null],
      type: [null, Validators.required],
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
    let eventId = this.generateUUID();
    let event = this.form.value;
    let data = new EventCoding(event.name, event.description,
      event.image_url, event.date, event.type ,"서울 강남구 역삼동 683-36 새롬빌딩 4층",
      "37.507797,127.045273", this.uid, eventId);
    console.log(data);
    this.af.database.object(`/events/${eventId}`)
      .update(data);
    this.af.database.object(`/profiles/${this.uid}/myEvent/${eventId}`).update({
      date : event.date
    });
    this.router.navigate(['/apps', 'profile']);
  }



}
