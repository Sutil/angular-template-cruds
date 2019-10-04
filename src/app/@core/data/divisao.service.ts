import { environment } from 'environments/environment';
import { AbstractEntityService } from './abstract-service';
import { Divisao } from 'app/models/divisao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DivisaoService extends AbstractEntityService<Divisao> {

  getBaseUrl(): string {
    return environment.urlDivisao();
  }
  getEntityName(): string {
    return 'Divisao';
  }
  newEntity(): Divisao {
    return new Divisao();
  }

  findByEmpresa(id: number): Observable<Divisao[]> {
    return this.http.get<Divisao[]>(environment.urlDivisao()+"findByEmpresa/"+id, 
      {headers: this.getHeaders()}
    );
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
