import { AbstractEntityServiceMock } from './abstract-mock-service';
import { Usuario } from '../../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { StatusUsuario } from '../../../models/statususuario.enum';

@Injectable()
export class UsuarioServiceMock extends AbstractEntityServiceMock<Usuario>{

  getBaseUrl(): string {
    return environment.urlUsuario();
  }

  getEntityName(): string {
    return 'Usuario';
  }

  newEntity(): Usuario {
    return new Usuario();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}