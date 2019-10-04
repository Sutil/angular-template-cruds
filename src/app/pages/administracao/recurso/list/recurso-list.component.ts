import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { RecursoService } from 'app/@core/data/recurso.service'
import { Recurso } from 'app/models/recurso.model'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'
import { Metodo } from './../../../../models/metodo.enum'

@Component({
  selector: 'recurso-list',
  templateUrl: './recurso-list.component.html',
  styleUrls: ['./recurso-list.component.scss'],
})
export class RecursoListComponent extends ListRedirectEditComponent<Recurso> {
  colunas = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: Recurso) => `${row.name}`,
      sortable: true,
    },
  ]

  constructor(
    service: RecursoService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Recurso,
  ): { title: string; description: string } {
    return {
      title: 'Delete Resource',
      description: `Are you sure?`,
    }
  }
}
