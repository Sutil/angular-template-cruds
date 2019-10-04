import { AbstractEntityService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Regional } from 'app/models/regional.model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class RegionalService extends AbstractEntityService<Regional> {

  getBaseUrl(): string {
    return environment.urlRegional();
  }
  getEntityName(): string {
    return 'Regional';
  }
  newEntity(): Regional {
    return new Regional();
  }

  findByDivisao(id: number): Observable<Regional[]> {
    return this.http.get<Regional[]>(environment.urlRegional()+"findByDivisao/"+id, 
      {headers: this.getHeaders()}
    );
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}
