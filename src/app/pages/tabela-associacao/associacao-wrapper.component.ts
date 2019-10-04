import { ColunaDefType } from './../../components/neos-abstract-list/neos-abstract-list.component';
import { animate, state, style, transition, trigger } from '@angular/animations'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks'
import {
  EXPANSION_PANEL_ANIMATION_TIMING,
  MatPaginator,
  MatPaginatorIntl,
  MatSort,
  MatTableDataSource,
} from '@angular/material'
import { AbstractEntityService } from 'app/@core/data/abstract-service'
import { BasicEntity } from 'app/models/base/basicentity.model'
import { MatPaginatorPtbrProvider } from '../../components/list-wrapper-paginator/list-wrapper-paginator.component'

@Component({
  selector: 'wtc-associacao-wrapper',
  templateUrl: './associacao-wrapper.component.html',
  styleUrls: ['./associacao-wrapper.component.scss'],
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
export class AssociacaoWrapperComponent implements OnInit, AfterViewInit {
  @Input()
  colunas: ColunaDefType<any>[] = []

  @Input()
  entidadeService: AbstractEntityService<any>
  @Input()
  entidadesSelecionadas: BasicEntity[] = []

  @Output()
  onChangeSelected: EventEmitter<BasicEntity[]> = new EventEmitter()

  @ViewChild(MatPaginator)
  paginator: MatPaginator
  @ViewChild(MatSort)
  sort: MatSort

  dataSource: MatTableDataSource<any>
  displayedCols = this.colunas.map(x => x.columnDef)

  constructor() {
    this.dataSource = new MatTableDataSource<any>([])
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnInit() {
    this.displayedCols = ['incluir'].concat(this.colunas.map(x => x.columnDef))

    this.entidadeService.findAll().subscribe((Es: any[]) => {
      this.dataSource.data = Es
    })
  }

  toggleEntidade_(entidade: BasicEntity) {
    const position = this.getPosition(entidade)
    if (position > -1) {
      this.entidadesSelecionadas.splice(position, 1)
    } else {
      this.entidadesSelecionadas.push(entidade)
    }

    this.onChangeSelected.emit(this.entidadesSelecionadas)
  }

  getPosition(entidade: BasicEntity): number {
    return this.entidadesSelecionadas.findIndex(obj => obj.id === entidade.id)
  }

  isSelected(e: any): boolean {
    return !!this.entidadesSelecionadas.find(obj => obj.id === e.id)
  }

  toggleEntidade(entidade: BasicEntity) {
    const position = this.getPosition(entidade)
    if (position > -1) {
      this.entidadesSelecionadas.splice(position, 1)
    } else {
      this.entidadesSelecionadas.push(entidade)
    }

    this.onChangeSelected.emit(this.entidadesSelecionadas)
  }
}
