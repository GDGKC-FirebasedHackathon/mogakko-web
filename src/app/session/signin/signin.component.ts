import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {SessionService} from "../session.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
  	this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  googleLogin(){
    this.sessionService.googleLogin();
  }

  facebookLogin(){
    this.sessionService.facebookLogin();
  }

  onSubmit() {
  	this.router.navigate(['/dashboard']);
  }

}
