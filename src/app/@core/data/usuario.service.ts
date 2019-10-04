import { AbstractEntityService } from './abstract-service';
import { Usuario } from '../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class UsuarioService extends AbstractEntityService<Usuario>{

  getBaseUrl(): string {
    return environment.urlUsuario();
  }

  getEntityName(): string {
    return 'Usuario';
  }

  newEntity(): Usuario {
    return new Usuario();
  }

  findAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      this.getBaseUrl(), 
      { headers: this.getHeaders()});
  }

  findByStatus(status:string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      this.getBaseUrl()+'status/'+status,
      {headers: this.getHeaders()}
    );
  }

  

  findCnpjs(usuario: Usuario){
    return this.http.get(this.getBaseUrl()+'cnpjs/'+`${usuario.id}`, {headers: this.getHeaders()});
  }

  create(usuario: Usuario): Promise<Usuario>{
    console.log(usuario);
    return this.http.post(
      this.getBaseUrl(), 
      usuario, 
      {headers: this.getHeaders()}).toPromise()
        .then(value=> <Usuario>value);
  }

  aprovar(usuario: Usuario): Promise<any>{
    return this.http.post(
      environment.urlUsuario()+'ativar',
      usuario.username,
      {headers: this.getHeaders()}
    ).toPromise();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }

}
