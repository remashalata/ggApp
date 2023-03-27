import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-place-events',
  templateUrl: './place-events.page.html',
  styleUrls: ['./place-events.page.scss'],
})
export class PlaceEventsPage implements OnInit {
  eventPlaceList: any = [];
  constructor(
    public popoverCtrl: PopoverController,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async () => {
      this.getEventPlace();
    })
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    await popover.present();
  }
  getEventPlace() {
    this.eventService.getUserEventLocations().subscribe({
      next: (res) => {
        this.eventPlaceList = res;
      },
      error: (e) => {
        console.log(e.error)
      }
    })
  }

  goDetail(eventId: string) {
    this.router.navigate([`event-detail/${eventId}`]);
  }

  placeRemove(placeId: string) {
    console.log(placeId)
    this.eventService.removePlace(placeId).subscribe({
      next: (res) => {
        console.log(res)
        if (res) {
          this.getEventPlace();
        }
      },
      error: (e) => {
        console.log(e.error)
      }
    })
  }
}
