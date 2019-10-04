import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PresencaMensalService {

  constructor(private http: HttpClient) { }

  async getData(): Promise<any[]> {
    return this.http.get<any[]>(
      environment.urlPresencaMensal(),
      {headers: this.getHeaders()},
    ).toPromise();
  }

  async getDataAno(): Promise<any[]> {
    return this.http.get<any[]>(
      environment.urlPresencaAnual(),
      {headers: this.getHeaders()},
    ).toPromise();
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    });
    return headers;
  }
}
