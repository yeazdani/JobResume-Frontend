import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusListener = new Subject<boolean>()

  constructor(private http: HttpClient, private storageService: StorageService) { }

  register(user: any) {
    return this.http.post<any>(`${environment.baseApiUrl}signup`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${environment.baseApiUrl}login`, user)
      .pipe(
        tap(response => {
          if (!response.id) {
            console.log("user null, cant log in")
            return ;
          }
          const loggedInUser = {
            uid: response.id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email
          }
          const token = response.token;
          // TODO - login user
          this.doLoginUser(loggedInUser, token);
          this.authStatusListener.next(true);
        }),
        map(response => response)
      );
  }

  logout() {
    return this.http.post<any>(`${environment.baseApiUrl}agent/logout/`, {}).pipe(
      tap(response => {
        // TODO - logout user
      }),
      map(response => response),
      catchError(error => {
        return map(error);
      }));
  }

  isLoggedIn() {
    return !!this.storageService.getToken();
  }

  private doLoginUser(user: any, token: any) {
    this.storageService.setCurrentUser(user);
    this.storageService.setToken(token);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

}
