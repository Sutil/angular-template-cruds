import { environment } from 'environments/environment';
import { AbstractEntityService } from './abstract-service';
import { Filial } from 'app/models/filial.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FilialService extends AbstractEntityService<Filial> {

    getBaseUrl(): string {
        return environment.urlFilial();
    }
    getEntityName(): string {
        return 'Filial';
    }
    newEntity(): Filial {
        return new Filial();
    }

    findByRegional(id: number): Observable<Filial[]> {
        return this.http.get<Filial[]>(environment.urlFilial()+"findByRegional/"+id, 
      {headers: this.getHeaders()}
    );
    }

    constructor(protected http: HttpClient) {
        super(http);
    }

}
