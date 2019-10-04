import { AbstractEntityService } from './abstract-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioPerfilOrganizacao } from '../../models/usuarioperfilorganizacao.model';
import { environment } from 'environments/environment';

@Injectable()
export class UsuarioPerfilOrganizacaoService extends AbstractEntityService<UsuarioPerfilOrganizacao>{

  getBaseUrl(): string {
    return environment.urlPerfilUsuarioOrganizacao();
  }

  getEntityName(): string {
    return 'Usuario Perfil Organizacao';
  }

  newEntity(): UsuarioPerfilOrganizacao {
    return new UsuarioPerfilOrganizacao();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}