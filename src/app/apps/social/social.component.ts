import { Component } from '@angular/core';
import {AngularFire} from "angularfire2";

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {

  constructor(private af: AngularFire) {}

}
