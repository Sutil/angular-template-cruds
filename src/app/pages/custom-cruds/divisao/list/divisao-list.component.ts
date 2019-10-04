import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { DivisaoService } from 'app/@core/data/divisao.service'
import { Divisao } from 'app/models/divisao.model'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'

@Component({
  selector: 'divisao-list',
  templateUrl: './divisao-list.component.html',
  styleUrls: ['./divisao-list.component.scss'],
})
export class DivisaoListComponent extends ListRedirectEditComponent<Divisao> {
  colunas = [
    {
      columnDef: 'nome',
      header: 'Nome',
      cell: (row: Divisao) => `${row.nome}`,
      sortable: true,
    },
    {
      columnDef: 'razaoSocial',
      header: 'Empresa responsável',
      cell: (row: Divisao) => `${row.empresa.razaoSocial}`,
      sortable: true,
    },
  ]

  constructor(
    service: DivisaoService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Divisao,
  ): { title: string; description: string } {
    return {
      title: `Remover Divisão?`,
      description: `Tem certeza que deseja remover a divisão ${e.nome}?`,
    }
  }
}
