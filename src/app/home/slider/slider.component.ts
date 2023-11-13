
import { Component, OnDestroy, ViewChild } from '@angular/core';



@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],

})
export class SliderComponent implements OnDestroy {
  slides = [

    './assets/slider/1.png',
    './assets/slider/2.png',
    './assets/slider/3.png',
    './assets/slider/4.png'


  ];


  currentSlideIndex = 0;
  currentImage = this.slides[0]


  prevSlide() {

    this.currentSlideIndex =
    (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;

    this.image(this.currentSlideIndex);
  }


  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.image(this.currentSlideIndex)

  }

  image(i:number){
    this.currentImage = this.slides[i]

  }

  interval: any;

  constructor() {
    this.startCarousel();
  }

  startCarousel() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Change image every 3 seconds (adjust as needed)
  }

  stopCarousel() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.stopCarousel();
  }


}
