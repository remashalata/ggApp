import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active',
  templateUrl: './active.page.html',
  styleUrls: ['./active.page.scss'],
})
export class ActivePage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  go() {
    this.route.navigate(['signin']);
  }
}
