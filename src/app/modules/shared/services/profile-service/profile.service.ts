import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getUserInfo(uid: any) {
    return this.http.get<any>(`${environment.baseApiUrl}user?id=${uid}`);
  }
  updateUserInfo(userInfo: any) {
    return this.http.put<any>(`${environment.baseApiUrl}userinfo`, userInfo);
  }
  addExperience(obj: any) {
    return this.http.post<any>(`${environment.baseApiUrl}experience`, obj);
  }
  updateExperience(obj: any) {
    return this.http.put<any>(`${environment.baseApiUrl}experience`, obj);
  }
  getExperience(uid: any) {
    return this.http.get<any>(`${environment.baseApiUrl}experience?id=${uid}`);
  }
  addEducation(obj: any) {
    return this.http.post<any>(`${environment.baseApiUrl}education`, obj);
  }
  updateEducation(obj: any) {
    return this.http.put<any>(`${environment.baseApiUrl}education`, obj);
  }
  getEducation(uid: any) {
    return this.http.get<any>(`${environment.baseApiUrl}education?id=${uid}`);
  }
  addSkills(obj: any) {
    return this.http.post<any>(`${environment.baseApiUrl}skills`, obj);
  }
  updateSkills(obj: any) {
    return this.http.put<any>(`${environment.baseApiUrl}skills`, obj);
  }
  getSkills(uid: any) {
    return this.http.get<any>(`${environment.baseApiUrl}skills?id=${uid}`);
  }
  uploadPhoto(fd: any) {
    return this.http.post<any>(`${environment.baseApiUrl}photos`, fd);
  }
  getPhoto(uid: any) {
    return this.http.get<any>(`${environment.baseApiUrl}photos?id=${uid}`);
  }
  postJob(obj: any) {
    return this.http.post<any>(`${environment.baseApiUrl}job`, obj);
  }
  putJob(obj: any) {
    return this.http.put<any>(`${environment.baseApiUrl}job`, obj);
  }
  getJob(uid: any) {
    return this.http.get<any>(`${environment.baseApiUrl}job?id=${uid}`);
  }
}
