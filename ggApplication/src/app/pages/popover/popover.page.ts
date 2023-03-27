import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(
    private router: Router, 
    public popoverCtrl: PopoverController,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.storage.clear();
    this.popoverCtrl.dismiss();
    this.router.navigate(['signin']);
  }

}
