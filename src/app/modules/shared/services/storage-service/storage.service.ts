import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getToken(): string {
    return window.localStorage['token'];
  }

  setToken(token: string) {
    window.localStorage['token'] = token;
  }

  removeToken() {
    return localStorage.removeItem('token');
  }

  getRefreshToken(): string {
    return window.localStorage['refresh'];
  }

  setRefreshToken(token: string) {
    window.localStorage['refresh'] = `${token}`;
  }

  removeRefreshToken() {
    return localStorage.removeItem('refresh');
  }

  setCurrentUser(user: any) {
    if (user) {
      window.localStorage['user'] = JSON.stringify(user);
    }
  }
  getCurrentUser() {
    if (!!window.localStorage['user']) {
      return JSON.parse(window.localStorage['user']);
    } else {
      return false;
    }
  }
  removeCurrentUser() {
    return localStorage.removeItem('user');
  }
}
