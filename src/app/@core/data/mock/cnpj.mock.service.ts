import { HttpClient } from '@angular/common/http';
import { Cnpj } from '../../../models/cnpj.model';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AbstractEntityServiceMock } from './abstract-mock-service';
import { UsuarioService } from 'app/@core/data/usuario.service';

@Injectable()
export class CnpjServiceMock extends AbstractEntityServiceMock<Cnpj> {

  getBaseUrl(): string {
    return environment.urlCnpj();
  }
  getEntityName(): string {
    return 'CNPJ';
  }
  newEntity(): Cnpj {
    return new Cnpj();
  }

  constructor(protected http: HttpClient, protected usuarioService: UsuarioService) {
    super(http);
  }
}
