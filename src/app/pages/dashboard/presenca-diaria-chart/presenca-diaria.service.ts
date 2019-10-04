import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PresencaDiariaService {

  constructor(private http: HttpClient) { }


  async getData(day: string): Promise<any[]> {
    return await this.http.get<any[]>(
      environment.urlPresencaDiaria(day),
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
