import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URLS } from 'src/assets/http';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private USERS_APIS = API_URLS.users;
  constructor(private _http: HttpClient) { }
  getUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.USERS_APIS.getUsers).pipe(take(1));
  }
  getUserById(userId: string): Observable<IUser[]> {
    return this._http
      .get<IUser[]>(`${this.USERS_APIS.getUserById}${userId}`)
      .pipe(take(1));
  }
}
