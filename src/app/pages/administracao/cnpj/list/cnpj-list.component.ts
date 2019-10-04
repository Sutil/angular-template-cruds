import { Component } from '@angular/core'
import { MatDialog, MatSnackBar } from '@angular/material'
import { ActivatedRoute, Router } from '@angular/router'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'
import { CnpjService } from './../../../../@core/data/cnpj.service'
import { Cnpj } from './../../../../models/cnpj.model'

@Component({
  selector: 'cnpj-list',
  templateUrl: './cnpj-list.component.html',
  styleUrls: ['./cnpj-list.component.scss'],
})
export class CnpjListComponent extends ListRedirectEditComponent<Cnpj> {
  constructor(
    service: CnpjService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  colunas = [
    {
      columnDef: 'cnpj',
      header: 'Cnpj',
      cell: (row: Cnpj) => row.cnpjFornecedor,
      sortable: true,
    },
  ]

  protected deleteDialogText(e: Cnpj): { title: string; description: string } {
    return {
      title: 'Deletar CNPJ?',
      description: `Tem certeza que quer deletar o CNPJ '${e.cnpjFornecedor}'?`,
    }
  }
}
