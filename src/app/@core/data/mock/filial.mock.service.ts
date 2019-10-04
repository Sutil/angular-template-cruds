import { AbstractEntityServiceMock } from './abstract-mock-service';
import { Filial } from 'app/models/filial.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FilialServiceMock extends AbstractEntityServiceMock<Filial> {

    getBaseUrl(): string {
        return './assets/mock/filial.findall.json';
    }
    getEntityName(): string {
        return 'Filial';
    }
    newEntity(): Filial {
        return new Filial();
    }

    findByRegional(id: number): Observable<Filial[]> {
        // Como é apenas um mock vamos fazer isso mesmo
        return this.findAll();
      }

    constructor(protected http: HttpClient) {
        super(http);
    }

}
