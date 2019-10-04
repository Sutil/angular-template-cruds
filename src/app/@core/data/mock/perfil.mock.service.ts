import { Perfil } from './../../../models/perfil.model';
import { AbstractEntityServiceMock } from './abstract-mock-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class PerfilMockService extends AbstractEntityServiceMock<Perfil>{

    getBaseUrl(): string {
        return environment.urlPerfil();
    }

    getEntityName(): string {
        return 'Perfil';
    }

    newEntity(): Perfil {
        return new Perfil();
    }

    constructor(protected http: HttpClient) {
        super(http);
    }
}