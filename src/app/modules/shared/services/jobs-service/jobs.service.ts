import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllJobs(){
    return this.http.get<any>(`${environment.baseApiUrl}jobs`);
  }
  getAllSingleJobs() {
    return this.http.get<any>(`${environment.baseApiUrl}singlejobs`);
  }
  getJobById(id) {
    return this.http.get<any>(`${environment.baseApiUrl}singlejob?id=${id}`);
  }
}
