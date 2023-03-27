import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Event } from 'src/app/models/event';
import { Storage } from '@ionic/storage-angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  event!: Event;
  description = "";
  eventId!: string;
  name = "";
  latitude: any;
  longitude: any;
  type!: string;
  location = "";
  startDate!: any;
  endDate!: any;
  userRole: any;
  userInfor: any;
  owner: any;
  show = true;
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private eventService: EventService,
    public toastController: ToastController,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    this.userInfor = await this.getUserInformation();
    this.userRole = this.userInfor.role;
    if (this.route.snapshot.params['id']) {
      this.eventId = this.route.snapshot.params['id'];
      this.getEventDetail(this.eventId);
    }
  }

  async getUserInformation() {
    let res = await this.storage.get("userInformation")
    let userInformation = JSON.parse(res);
    console.log(userInformation)
    return userInformation;
 }

  getEventDetail(eventId: string) {
    this.eventService.getEventOneLocation(eventId).subscribe((res: Event) => {
      this.event = res;
      this.name = res.name;
      this.latitude = res.latitude;
      this.longitude = res.longitude;
      this.description = res.description;
      this.location = res.location;
      this.type = res.type;
      this.startDate = res.startDate;
      this.endDate = res.endDate;
      this.owner = res.userId;
      console.log(res.userId, this.userInfor.id)
      if (res.userId == this.userInfor.id) {
        this.show = false;
      }
      this.cdr.detectChanges();
    });
  }

  joinRequest() {
    let data = {
      eventId : this.eventId,
    }

    this.eventService.requestEvent(this.eventId).subscribe({
      next: (res) => {
        if (res) {
          this.displayMessageToast();
        }
      },
      error: (e) => {
        this.displayErrorMessageToast(e.error)
      }
    });

  }

  displayErrorMessageToast(message: string) {
    this.toastController.create({
      header: 'Event Join',
      message: message,
      position: 'top',
      cssClass: "toast-error-class",
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }

  displayMessageToast() {
    this.toastController.create({
      header: 'Event Join',
      message: "Success",
      position: 'top',
      cssClass: "toast-custom-class",
      buttons: [
        {
          side: 'end',
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }

}
