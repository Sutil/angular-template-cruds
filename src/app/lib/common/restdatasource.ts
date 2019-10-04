
import { CollectionViewer } from '@angular/cdk/collections'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort' 
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { of } from 'rxjs/observable/of'
import { catchError, debounceTime, finalize, tap } from 'rxjs/operators'
import { Subscription } from 'rxjs/Subscription'
import { AbstractEntityService } from '../../@core/data/abstract-service'
import { BasicEntity } from '../../models/base/basicentity.model'
import { AsyncDataSource } from '../../components/neos-abstract-list/async-data-source';

export class RestDataSource<T extends BasicEntity> extends AsyncDataSource<T> {
  get paginator() {
    return this._paginator
  }
  set paginator(paginator: MatPaginator | null) {
    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe()
    }

    this._paginator = paginator
    if (this._paginator) {
      this.pageChangeSubscription = this._paginator.page
        .pipe(tap(() => this.loadEntities()))
        .subscribe()
    }
  }

  get sort() {
    return this._sort
  }
  set sort(sort: MatSort | null) {
    if (this.sortChangeSubscription) {
      this.sortChangeSubscription.unsubscribe()
    }

    this._sort = sort
    if (this._sort) {
      this.sortChangeSubscription = this._sort.sortChange
        .pipe(tap(() => this.loadEntities()))
        .subscribe()
    } else {
      this.loadEntities()
    }
  }

  get filter() {
    return this.filter$.value
  }
  set filter(filter: string) {
    this.filter$.next(filter)
  }

  get data() {
    return this.entitySubject$.value
  }

  private filter$ = new BehaviorSubject<string>('')
  private _paginator: MatPaginator | null
  private _sort: MatSort | null

  private pageChangeSubscription: Subscription
  private sortChangeSubscription: Subscription
  private filterChangeSubscription: Subscription
  private entitySubject$ = new BehaviorSubject<T[]>([])
  private loadingSubject$ = new BehaviorSubject<boolean>(false)

  // tslint:disable-next-line:member-ordering
  loading$ = this.loadingSubject$.asObservable()

  constructor(private service: AbstractEntityService<T>) {
    super()
  }

  connect(collectionViewer: CollectionViewer) {
    if (this.filterChangeSubscription) {
      this.filterChangeSubscription.unsubscribe()
    }
    this.filterChangeSubscription = this.filter$
      .pipe(debounceTime(500))
      .subscribe(value => this.loadEntities(value))
    return this.entitySubject$.asObservable()
  }
  disconnect(collectionViewer: CollectionViewer) {
    this.entitySubject$.complete()
    this.loadingSubject$.complete()

    if (this.sortChangeSubscription) {
      this.sortChangeSubscription.unsubscribe()
    }

    if (this.pageChangeSubscription) {
      this.pageChangeSubscription.unsubscribe()
    }

    if (this.filterChangeSubscription) {
      this.filterChangeSubscription.unsubscribe()
    }
    this.filter$.complete()
  }

  loadEntities(
    filter: string = this.filter,
    sortOrder?: 'asc' | 'desc' | '',
    sortKey?: string,
    pageNumber?: number,
    pageSize?: number,
  ) {
    if (this.sort) {
      sortOrder = sortOrder === undefined ? this.sort.direction : sortOrder
      sortKey = sortOrder === '' ? this.sort.active : 'id'
    }
    if (this.paginator) {
      pageNumber =
        pageNumber === undefined ? this.paginator.pageIndex : pageNumber
      pageSize = pageSize === undefined ? this.paginator.pageSize : pageSize
    }

    this.loadingSubject$.next(true)

    this.service
      .findEntities(filter, sortOrder, sortKey, pageNumber, pageSize)
      .pipe(
        catchError(() =>
          of({
            data: [],
            page: {
              size: 0,
              totalElements: 0,
              totalPages: 0,
              number: 0,
            },
          }),
        ),
        finalize(() => this.loadingSubject$.next(false)),
      )
      .subscribe(result => {
        const entities = result.data
        this.entitySubject$.next(entities)
        if (this.paginator) {
          this.paginator.length = result.page.totalElements
        }
      })
  }
}
