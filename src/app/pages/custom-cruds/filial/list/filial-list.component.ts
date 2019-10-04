import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { FilialService } from 'app/@core/data/filial.service'
import { Filial } from 'app/models/filial.model'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'

@Component({
  selector: 'iad-filial-list',
  templateUrl: './filial-list.component.html',
  styleUrls: ['./filial-list.component.scss'],
})
export class FilialListComponent extends ListRedirectEditComponent<Filial> {
  colunas = [
    {
      columnDef: 'razaoSocial',
      header: 'Nome',
      cell: (row: Filial) => `${row.razaoSocial}`,
      sortable: true,
    },
    {
      columnDef: 'regional',
      header: 'Regional Responsável',
      cell: (row: Filial) => `${row.cnpj}`,
      sortable: true,
    }
  ]

  constructor(
    service: FilialService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Filial,
  ): { title: string; description: string } {
    return {
      title: 'Remover Filial?',
      description: `Tem certeza que deseja remover a filial '${
        e.razaoSocial
      }'?`,
    }
  }
}
