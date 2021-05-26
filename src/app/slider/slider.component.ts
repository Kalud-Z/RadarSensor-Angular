import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { API } from 'nouislider';

import * as noUiSlider from 'nouislider';



@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class SliderComponent implements AfterViewInit {
  @ViewChild('slider') slider: ElementRef;
  sliderInstance: API;


  constructor() { }

  ngAfterViewInit(): void {
    this.sliderInstance = noUiSlider.create(this.slider.nativeElement, {
      range: { 'min': 0,  'max': 255 },
      start: [10, 33, 77, 189],
      margin: 7,
      direction: 'rtl',
      orientation: 'vertical',
      behaviour: 'tap-drag',
      // tooltips: true,
    });

    this.sliderInstance.on('update', (values, handle) => {
      console.log('values : ' ,  values);
      console.log('handle : ' , handle);
    });
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
