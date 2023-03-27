import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Storage } from  '@ionic/storage-angular';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { User } from  '../models/user';
import { AuthResponse } from  '../models/auth-response';

const API_USERS_URL = `http://localhost:5000/api/users`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient, private  storage:  Storage) { }

  // CREATE =>  POST: add a new user to the server
  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_USERS_URL}/signup`, user);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_USERS_URL}/signin`, { email, password });
  }
}
