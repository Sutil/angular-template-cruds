
import {of as observableOf,  Observable } from 'rxjs';
import { AbstractEntityService } from 'app/@core/data/abstract-service';
import { BasicEntity } from 'app/models/base/basicentity.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';

/**
 * Classe com comportamento padrão de um Mock de Serviço
 * Mock, pois não faz nenhuma conexão real
 */
export abstract class AbstractEntityServiceMock<T extends BasicEntity> extends
  AbstractEntityService<T> {
  constructor(protected http: HttpClient) {
    super(http);
    this.http.get<T[]>(this.getBaseUrl())
      .subscribe((ts: T[]) => this.__memoryData = ts);
  }

  abstract getBaseUrl(): string;

  abstract getEntityName(): string;

  abstract newEntity(): T;

  __memoryData: T[];

  findAll(): Observable<T[]> {
    if (!this.__memoryData) {
      return this.http.get<T[]>(this.getBaseUrl());
    }
    return observableOf(this.__memoryData);
  }

  async count() {
    const lista = await this.findAll().toPromise();
    return lista.length;
  }

  findById(id: number): Observable<T> {
    if (!Number.isInteger(id) || id < 0) {
      return observableOf(this.newEntity());
    }
    if (!this.__memoryData) {
      return this.http.get(this.getBaseUrl())
        .pipe(map((entities: T[]) => entities.find(e => e.id === id)));
    }

    return observableOf(this.__memoryData.find((e: T) => e.id === id));
  }

  create(newEntity: T): Promise<T> {
    console.log('mock creating', newEntity);
    if (!this.__memoryData) {
      return this.findAll().toPromise().then(() => this.create(newEntity));
    }

    let newid = Math.max(...this.__memoryData.map(x => x.id)) + 1;

    if (newid === Number.NEGATIVE_INFINITY) {
      newid = 1;
    }

    newEntity.id = newid;
    // newEntity.version = 0;
    this.__memoryData.push(newEntity);
    return observableOf(newEntity).toPromise();
  }

  remove(deleteEntity: T): Promise<T> {
    if (!this.__memoryData) {
      return this.findAll().toPromise().then(() => this.remove(deleteEntity));
    }

    const indice: number = this.getIndex(deleteEntity);
    if (indice > -1) {
      this.__memoryData.splice(indice, 1);
    }
    return observableOf(deleteEntity).toPromise();
  }

  save(entity: T): Promise<T> {
    if (!this.__memoryData) {
      return this.findAll().toPromise().then(() => this.save(entity));
    }

    if (entity.id === -1) {
      return this.create(entity);
    }

    const index = this.__memoryData.findIndex((e: T) => e.id === entity.id);
    if (index === -1) {
      return this.create(entity);
    }

    return new Promise<T>((resolve, reject) => {
      const e = this.__memoryData[index];
      // if (e.version !== undefined && e.version !== entity.version) {
      //   console.error(e, entity);
      //   return reject(
      //     'Erro: ' + this.getEntityName() + ' foi editado antes desta ação.');
      // }

      // entity.version = (entity.version + 1) || 0;
      this.__memoryData[index] = entity;
      return resolve(entity);
    });
  }

  getIndex(entidade: T): number {
    let position = -1;
    this.__memoryData.forEach((obj: T, index) => {
      if (obj.id === entidade.id) {
        position = index;
      }
    });
    return position;
  }
}


