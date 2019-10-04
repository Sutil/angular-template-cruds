import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioPerfilOrganizacao } from '../../../models/usuarioperfilorganizacao.model';
import { AbstractEntityServiceMock } from './abstract-mock-service';
import { environment } from 'environments/environment';

@Injectable()
export class UsuarioPerfilOrganizacaoServiceMock extends AbstractEntityServiceMock<UsuarioPerfilOrganizacao>{

  getBaseUrl(): string {
    return environment.urlPerfilUsuarioOrganizacao();
  }

  getEntityName(): string {
    return 'Usuario Perfil Organização';
  }

  newEntity(): UsuarioPerfilOrganizacao {
    return new UsuarioPerfilOrganizacao();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}