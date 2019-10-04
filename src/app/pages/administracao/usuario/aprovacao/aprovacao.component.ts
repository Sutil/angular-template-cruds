import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { MatPaginatorIntl, MatTableDataSource } from '@angular/material'
import { EXPANSION_PANEL_ANIMATION_TIMING } from '@angular/material/expansion'
import { UsuarioService } from '../../../../@core/data/usuario.service'
import { MatPaginatorPtbrProvider } from '../../../../i18n/mat-paginator.intl'
import { Usuario } from '../../../../models/usuario.model'

@Component({
  selector: 'aprovacao',
  templateUrl: './aprovacao.component.html',
  styleUrls: ['./aprovacao.component.scss'],
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
export class AprovacaoComponent implements OnInit {
  dataSource: MatTableDataSource<any>

  colunas: {
    columnDef: string
    header: string
    cell: (row) => string
    sortable: boolean
  }[] = [
    {
      columnDef: 'username',
      header: 'Username',
      cell: (user: Usuario) => user.username,
      sortable: true,
    },
  ]

  displayedCols = this.colunas.map(x => x.columnDef)

  constructor(public service: UsuarioService) {
    this.dataSource = new MatTableDataSource<any>([])
  }

  ngOnInit() {
    this.displayedCols = this.colunas.map(x => x.columnDef).concat('acao')
    this.renewData()
  }

  renewData() {
    this.service.findByStatus('PENDENTE').subscribe((Es: any[]) => {
      if (!Es) {
        Es = []
      }
      this.dataSource.data = Es
    })
  }

  aprovar(usuario: Usuario) {
    this.service
      .aprovar(usuario)
      .then(res => {
        this.renewData()
      })
      .catch(err => {
        console.log('erro')
      })
  }
}
