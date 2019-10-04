import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CounterFiliaisService {

  constructor(private http: HttpClient) { }

  async count(): Promise<number> {
    return await this.http.get<number>(
      environment.urlCount(environment.urlFilial()),
      {headers: this.getHeaders()},
    ).toPromise();
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    });
    return headers;
}
}
