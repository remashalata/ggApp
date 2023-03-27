import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification';

const API_NOTIFICATION_URL = `http://localhost:5000/api/notifications`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
  ) { }

  getNotifications(): Observable<any> {
    return this.http.get<any>(API_NOTIFICATION_URL);
  }
  readNotifications() {
    return this.http.get(`${API_NOTIFICATION_URL}/read`);
  }
}
