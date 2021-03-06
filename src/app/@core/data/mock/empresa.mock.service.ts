import { AbstractEntityServiceMock } from './abstract-mock-service';
import { Empresa } from 'app/models/empresa.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

/**
 * Serviço que busca as Empresas do backend
 */
@Injectable()
export class EmpresaServiceMock extends AbstractEntityServiceMock<Empresa> {

    getBaseUrl(): string {
        return environment.urlEmpresa();
    }
    getEntityName(): string {
        return 'Empresa';
    }
    newEntity(): Empresa {
        return new Empresa();
    }

    constructor(protected http: HttpClient) {
        super(http);
    }
}
