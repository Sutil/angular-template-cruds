import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AbstractEntityService } from 'app/@core/data/abstract-service';
import { Cnpj } from './../../models/cnpj.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CnpjService  extends AbstractEntityService<Cnpj> {

    getBaseUrl(): string {
        return environment.urlCnpj();
      }
      getEntityName(): string {
        return 'CNPJ';
      }
      newEntity(): Cnpj {
        return new Cnpj();
      }

      findByUserId(id): Observable<Cnpj[]>{
        return this.http.get<Cnpj[]>(this.getBaseUrl()+'usuario/'+id, { headers: this.getHeaders() });
      }
    
      constructor(protected http: HttpClient) {
        super(http);
      }

}