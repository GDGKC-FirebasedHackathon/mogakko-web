import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  constructor() {}
  demo: number;
  val: number = 50;
  min: number = 0;
  max: number = 100;
}