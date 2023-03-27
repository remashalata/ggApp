import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-request-events',
  templateUrl: './request-events.page.html',
  styleUrls: ['./request-events.page.scss'],
})
export class RequestEventsPage implements OnInit {
  requestList: any = [];
  constructor(
    public popoverCtrl: PopoverController,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMyRequest()
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    await popover.present();
  }

  getMyRequest() {
    this.eventService.requestMyEvent().subscribe({
      next: (res) => {
        this.requestList = res;
      },
      error: (e) => {
        console.log(e.error)
      }
    })
  }

  goDetail(eventId: string) {
    this.router.navigate([`event-detail/${eventId}`]);
  }

}
