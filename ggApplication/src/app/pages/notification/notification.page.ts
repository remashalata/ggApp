import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationList: any = [];
  newNotificationList: any = [];
  constructor(
    private route: ActivatedRoute,
    private notifictionService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async () => {
      this.getNotifications();
      this.readNotifications();
    })
  }

  getNotifications() {
    this.notifictionService.getNotifications().subscribe({
      next: (res) => {
        this.notificationList = res.notifications;
        this.newNotificationList = res.newNotifications;
      },
      error: (e) => {
        console.log(e.error)
      }
    })
  }

  readNotifications() {
    this.notifictionService.readNotifications().subscribe({
      next: (res) => {
        this.newNotificationList = res;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.log(e.error)
      }
    })
  }

}
