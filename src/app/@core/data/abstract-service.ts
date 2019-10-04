import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { BasicEntity } from 'app/models/base/basicentity.model'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { map } from 'rxjs/operators'

export abstract class AbstractEntityService<T extends BasicEntity> {
  constructor(protected http: HttpClient) {}

  abstract getBaseUrl(): string

  abstract getEntityName(): string

  abstract newEntity(): T

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getBaseUrl(), { headers: this.getHeaders() })
  }

  async count(): Promise<number> {
    throw new Error('Not implemented');
  }

  async promiseFindAll(): Promise<T[]> {
    try {
      return await this.findAll().toPromise()
    } catch (error) {
      const httpError = error as HttpErrorResponse
      if (httpError.error instanceof ErrorEvent) {
        throw new Error('Houve um erro ao fazer a busca.')
      } else {
        const status = httpError.status // 401, 404, etc
        const body = httpError.error
        if (status === 401) {
          throw new Error('Você não tem acesso para usar este recurso')
        } else {
          throw new Error('Erro desconhecido')
        }
      }
    }
  }

  getData(startIndex, pageSize): Observable<any> {
    return this.http.get(
      this.getBaseUrl() + '?page=' + startIndex + '&pageSize=' + pageSize,
      { headers: this.getHeaders() },
    )
  }

  getDataFilter(startIndex, pageSize, filtro): Observable<any> {
    return this.http.get(
      this.getBaseUrl() +
        '?page=' +
        startIndex +
        '&pageSize=' +
        pageSize +
        '&filtro=' +
        filtro,
      { headers: this.getHeaders() },
    )
  }

  findById(id: number): Observable<T> {
    if (!Number.isInteger(id) || id < 0) {
      return of(this.newEntity())
    }

    return this.http.get<T>(this.getBaseUrl() + `${id}`, {
      headers: this.getHeaders(),
    })
  }

  create(newEntity: T): Promise<T> {
    console.log('creating', newEntity);
    const copy = Object.assign(newEntity)
    delete copy.id
    delete copy.version

    return this.http
      .post(this.getBaseUrl(), copy, { headers: this.getHeaders() })
      .toPromise()
      .then(value => <T>value)
  }

  save(entity: T): Promise<T> {
    console.log('saving', entity);
    return this.http
      .put(this.getBaseUrl(), entity, { headers: this.getHeaders() })
      .toPromise()
      .then(value => <T>value)
  }

  remove(entity: T): Promise<T> {
    return this.http
      .delete(this.getBaseUrl() + `${entity.id}`, {
        headers: this.getHeaders(),
      })
      .toPromise()
      .then(e => <T>e)
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    })
    return headers
  }

  findEntities(
    filter: string = '',
    sortOrder: 'asc' | 'desc' | '' = '',
    sortKey: string = 'id',
    pageNumber: number = 0,
    pageSize: number = 8,
  ) {
    console.warn('findEntities ainda não implementado')
    /* const params = new HttpParams()
      .set('filter', filter)
      .set('sortKey', sortKey.toString())
      .set('sortOrder', sortOrder)
      .set('page', pageNumber.toString())
      .set('pageSize', pageSize.toString()) */

    return this.findAll().pipe(
      map(es => {
        if (sortOrder === '') {
          sortOrder = 'asc'
        }
        es.sort((a, b) => {
          const A = sortOrder === 'asc' ? a : b
          const B = sortOrder === 'asc' ? b : a

          if (typeof A[sortKey] === 'string') {
            return A[sortKey].localeCompare(B[sortKey])
          }
          if (typeof A[sortKey] === 'number') {
            return A[sortKey] - B[sortKey]
          }
          return 0
        })

        const filtered =
          filter.length > 0
            ? es.filter(e =>
                JSON.stringify(e)
                  .toLowerCase()
                  .includes(filter.trim().toLowerCase()),
              )
            : es

        const result = filtered.slice(
          pageNumber * pageSize,
          (pageNumber + 1) * pageSize,
        )

        return {
          data: result,
          page: {
            size: pageSize,
            totalElements: filtered.length,
            totalPages: Math.ceil(filtered.length / pageSize),
            number: pageNumber,
          },
        }
      }),
    )
  }
}
