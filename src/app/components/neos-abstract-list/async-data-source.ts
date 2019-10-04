import { DataSource } from '@angular/cdk/table'
import { MatTableDataSource } from '@angular/material'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { Observable, of } from 'rxjs'

export abstract class AsyncDataSource<T> extends DataSource<T> {
  paginator: MatPaginator | null
  sort: MatSort | null
  filter: string

  loading$: Observable<boolean>
}


export class MatTableDataSourceAdapter<T> extends MatTableDataSource<T>
  implements AsyncDataSource<T> {
  loading$ = of(false)
}
