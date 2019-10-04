import { AbstractEntityService } from 'app/@core/data/abstract-service';
import { HttpClient } from '@angular/common/http';
import { Recurso } from './../../models/recurso.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class RecursoService extends AbstractEntityService<Recurso> {

  getBaseUrl(): string {
    return environment.urlRecurso();
  }
  getEntityName(): string {
    return 'Recurso';
  }
  newEntity(): Recurso {
    return new Recurso();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }

}
