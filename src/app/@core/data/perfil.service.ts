import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from 'app/models/perfil.model';
import { environment } from 'environments/environment';
import { AbstractEntityService } from './abstract-service';


@Injectable()
export class PerfilService extends AbstractEntityService<Perfil> {

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