import { animate, state, style, transition, trigger } from '@angular/animations'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { EXPANSION_PANEL_ANIMATION_TIMING } from '@angular/material/expansion'
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { BehaviorSubject } from 'rxjs'
import { delay } from 'rxjs/operators'
import { AsyncDataSource } from './async-data-source'

export interface ColunaDefType<T> {
  columnDef: string
  header: string
  cell: (row: T) => string
  sortable: boolean
}

interface IconProps {
  show: boolean
  disabled?: boolean
  enabledIcon?: string
  disabledIcon?: string
}

type IconPropType<T> = IconProps | ((row: T) => IconProps)

@Injectable()
export class MatPaginatorPtbrProvider extends MatPaginatorIntl {
  itemsPerPageLabel = 'Itens por página:'
  firstPageLabel = 'Página inicial'
  nextPageLabel = 'Próxima'
  previousPageLabel = 'Anterior'
  lastPageLabel = 'Última Página'
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`
    }
    length = Math.max(length, 0)
    const startIndex = page * pageSize
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize

    return `${startIndex + 1} - ${endIndex} de ${length}`
  }
}


@Component({
  selector: 'neos-abstract-list',
  templateUrl: './neos-abstract-list.component.html',
  styleUrls: ['./neos-abstract-list.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorPtbrProvider },
  ],

  animations: [
    trigger('expand', [
      state(
        'true',
        style({
          'transform-origin': 'top',
          height: '*',
          transform: 'scaleY(1)',
        }),
      ),
      state(
        'false',
        style({
          'transform-origin': 'top',
          height: '0px',
          transform: 'scaleY(0)',
        }),
      ),
      transition('true <=> false', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
    ]),
  ],
})
export class NeosAbstractListComponent<T = any>  {

  get dataSource() {
    return this._dataSource
  }

  @Input()
  set dataSource(dataSource: AsyncDataSource<T>) {
    this._dataSource = dataSource

    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

    this.loading$ = this.dataSource.loading$.pipe(delay(1))
  }

  get colunas() {
    return this._colunas
  }
  @Input()
  set colunas(colunas: ColunaDefType<T>[]) {
    this._colunas = colunas
    this.displayedCols = this.colunas.map(x => x.columnDef).concat('editar')
  }

  /**
   * Show add button?
   */
  @Input()
  add = true

  @Input()
  set editIcon(value: IconPropType<T>) {
    if (typeof value === 'function') {
      this._editIconFn = value
      this._editIconProp = undefined
    } else {
      this._editIconFn = undefined
      this._editIconProp = value
    }
  }

  _editIconFn?: (row: T) => IconProps
  _editIconProp?: IconProps = {
    show: true,
    disabled: false,
    enabledIcon: 'edit',
    disabledIcon: 'edit',
  }

  @Input()
  set deleteIcon(value: IconPropType<T>) {
    if (typeof value === 'function') {
      this._deleteIconFn = value
      this._deleteIconProp = undefined
    } else {
      this._deleteIconFn = undefined
      this._deleteIconProp = value
    }
  }

  _deleteIconFn?: (row: T) => IconProps
  _deleteIconProp?: IconProps = {
    show: true,
    disabled: false,
    enabledIcon: 'delete',
    disabledIcon: 'delete',
  }

  @Input()
  set hasFilter(val: any) {
    this._hasFilter = coerceBooleanProperty(val)
    if (!this._hasFilter) {
      this.dataSource.filter = ''
    }
  }
  get hasFilter() {
    return this._hasFilter
  }
  _hasFilter = true


  @Output()
  editButtonClicked = new EventEmitter<T | null>()

  @Output()
  addButtonClicked = new EventEmitter<void>()

  @Output()
  deleteButtonClicked = new EventEmitter<T | null>()

  @ViewChild(MatPaginator)
  paginator: MatPaginator

  @ViewChild(MatSort)
  sort: MatSort

  displayedCols: string[] = []

  // tslint:disable-next-line:rx-subject-restrictions
  loading$ = new BehaviorSubject<boolean>(false).asObservable()

  private _dataSource: AsyncDataSource<T>

  private _colunas: ColunaDefType<T>[]

  constructor() {}

  onEditButtonClick(entity: T) {
    this.editButtonClicked.emit(entity)
  }

  onAddButtonClick() {
    this.addButtonClicked.emit()
  }

  onDeleteButtonClick(entity: T) {
    this.deleteButtonClicked.emit(entity)
  }

}
