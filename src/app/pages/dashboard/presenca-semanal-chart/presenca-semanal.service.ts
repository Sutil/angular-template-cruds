import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PresencaSemanalService {
  constructor(private http: HttpClient) {}

  async getData(): Promise<any[]> {
    return await this.http
      .get<any[]>(environment.urlPresencaSemanal(), {
        headers: this.getHeaders(),
      })
      .toPromise();
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('userToken')
    });
    return headers;
  }
}
