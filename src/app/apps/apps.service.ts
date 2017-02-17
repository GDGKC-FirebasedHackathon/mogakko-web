import { Injectable } from '@angular/core';

@Injectable()
export class AppsService {

  profile: any;

  constructor() { }

  getProfile(){
    return this.profile
  }


  setProfile(profile){
    this.profile = profile
  }
}
