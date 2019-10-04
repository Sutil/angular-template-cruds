import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { EmpresaService } from 'app/@core/data/empresa.service'
import { Empresa } from 'app/models/empresa.model'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'

@Component({
  selector: 'empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss'],
})
export class EmpresaListComponent extends ListRedirectEditComponent<Empresa> {
  editDialogComponent
  colunas = [
    {
      columnDef: 'razaoSocial',
      header: 'Razão social',
      cell: (row: Empresa) => `${row.razaoSocial}`,
      sortable: true,
    },
    {
      columnDef: 'cnpj',
      header: 'CNPJ',
      cell: (row: Empresa) =>
        `${row.cnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})*/,
          '$1.$2.$3/$4-$5',
        )}`,
      sortable: true,
    },
  ]

  constructor(
    service: EmpresaService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Empresa,
  ): { title: string; description: string } {
    return {
      title: 'Deletar Empresa?',
      description: `Tem certeza que deseja deletar a empresa '${
        e.razaoSocial
      }'?`,
    }
  }
}
