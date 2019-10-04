import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { RegionalService } from 'app/@core/data/regional.service'
import { Regional } from 'app/models/regional.model'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'

@Component({
  selector: 'regional-list',
  templateUrl: './regional-list.component.html',
  styleUrls: ['./regional-list.component.scss'],
})
export class RegionalListComponent extends ListRedirectEditComponent<Regional> {
  colunas = [
    {
      columnDef: 'nome',
      header: 'Nome',
      cell: (row: Regional) => `${row.nome}`,
      sortable: true,
    },
    {
      columnDef: 'divisaoResp',
      header: 'Divisão responsável',
      cell: (row: Regional) => `${row.divisao.nome}`,
      sortable: true,
    },
  ]

  constructor(
    service: RegionalService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Regional,
  ): { title: string; description: string } {
    return {
      title: `Remover Regional?`,
      description: `Tem certeza que deseja remover a regional ${e.nome}?`,
    }
  }
}
