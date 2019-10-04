import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsvDiarioChartService {

  constructor(private http: HttpClient) { }

  async getData(day: string): Promise<any[]> {
    return this.http.get<any[]>(
      environment.urlIsvDiario(day),
      {headers: this.getHeaders()},
    ).toPromise();
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    });
    return headers;
  }
}
