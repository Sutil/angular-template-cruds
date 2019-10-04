import { Injectable } from '@angular/core';
import { AbstractEntityService } from 'app/@core/data/abstract-service';
import { Cliente } from '../../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ClienteService extends AbstractEntityService<Cliente> {

  getBaseUrl(): string {
    return './assets/mock/divisao.findall.json';
  }
  getEntityName(): string {
    return 'Cliente';
  }
  newEntity(): Cliente {
    return new Cliente();
  }

  findByEmpresa(id: number): Observable<Cliente[]> {
    throw new Error('Method not yet implemented. findByCliente');
  }

  constructor(protected http: HttpClient) {
    super(http);
  }

}
