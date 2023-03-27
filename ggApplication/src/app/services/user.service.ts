import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { User } from '../models/user';
import { Observable } from 'rxjs';

const API_USERS_URL = `http://localhost:5000/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  getUserLocations(): Observable<User[]> {
    return this.http.get<User[]>(API_USERS_URL);
    
  }

  updateProfile(profile: any) {
    return this.http.put(`${API_USERS_URL}/profile`, profile);
  }
}
