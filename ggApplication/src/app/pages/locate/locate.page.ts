import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
})
export class LocatePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 300,
    effect: 'flip',
  };
  constructor(private route:Router) { }

  ngOnInit() {
  }

  go(){
    this.route.navigate(['active']);
  }
}
