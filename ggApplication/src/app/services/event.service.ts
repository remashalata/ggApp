import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';

const API_EVENTS_URL = `http://localhost:5000/api/events`;
const API_PLACES_URL = `http://localhost:5000/api/places`;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }

  getEventLocations(): Observable<Event[]> {
    return this.http.get<Event[]>(API_EVENTS_URL);
  }

  getUserEventLocations(): Observable<Event[]> {
    return this.http.get<Event[]>(`${API_EVENTS_URL}/user/Events`);
  }

  getEventOneLocation(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${API_EVENTS_URL}/${eventId}`);
  }

  updateEventStatus(eventHistoryId: string) {
    return this.http.put(`${API_EVENTS_URL}/${eventHistoryId}`, {});
  }

  requestEvent(eventId: string) {
    return this.http.post(`${API_EVENTS_URL}/${eventId}`, {});
  }

  requestMyEvent() {
    return this.http.get(`${API_EVENTS_URL}/my/request`);
  }

  requestAllEvent() {
    return this.http.get(`${API_EVENTS_URL}/request/all`);
  }

  addPlace(data: any) {
    return this.http.post(`${API_PLACES_URL}`, data);
  }

  removePlace(placeId: string) {
    return this.http.delete(`${API_PLACES_URL}/${placeId}`);
  }
}
