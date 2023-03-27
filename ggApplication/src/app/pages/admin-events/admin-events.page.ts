import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.page.html',
  styleUrls: ['./admin-events.page.scss'],
})
export class AdminEventsPage implements OnInit {
  requestList: any = [];
  constructor(
    public popoverCtrl: PopoverController,
    private eventService: EventService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.getAllRequest()
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    await popover.present();
  }

  getAllRequest() {
    this.eventService.requestAllEvent().subscribe({
      next: (res) => {
        this.requestList = res;
      },
      error: (e) => {
        console.log(e.error)
      }
    })
  }

  async handleStatus(historyId: string) {
    const alert = await this.alertController.create({
      header: 'Status',
      message: 'You can change status',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.eventService.updateEventStatus(historyId).subscribe({
              next: (res) => {
                if (res) {
                  this.getAllRequest()
                }

              },
              error: (e) => {
                console.log(e.error)
              }
            })
          },
        },
      ],
    });

    await alert.present();
  }

}
