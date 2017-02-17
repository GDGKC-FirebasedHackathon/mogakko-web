import {Injectable, EventEmitter} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {Router} from "@angular/router";

@Injectable()
export class SessionService {

  authChanged = new EventEmitter<boolean> ();

  constructor(private af: AngularFire, private router: Router) { }

  googleLogin(){
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(
      (success) => {
        this.router.navigate(['/home']);
        console.log(success);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  facebookLogin(){
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
  }

  signOut(){
    this.af.auth.logout().then(
      (e) => {
        this.router.navigate(['/session', 'signin']);
      }
    );
  }


  // login() {
  //   this.af.auth.login({
  //     provider: AuthProviders.Twitter,
  //     method: AuthMethods.Popup,
  //   });
  // }

}
