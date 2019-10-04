import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { PerfilService } from 'app/@core/data/perfil.service'
import { Perfil } from 'app/models/perfil.model'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilListaComponent extends ListRedirectEditComponent<Perfil> {
  colunas = [
    {
      columnDef: 'nome',
      header: 'Nome',
      cell: (row: Perfil) => `${row.nome}`,
      sortable: true,
    },
    {
      columnDef: 'qtde-recursos',
      header: 'Quantidade de Recursos',
      cell: (row: Perfil) => `${row.recursos.length}`,
      sortable: true,
    },
  ]

  constructor(
    service: PerfilService,
    activatedRoute: ActivatedRoute,
    router: Router,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Perfil,
  ): { title: string; description: string } {
    return {
      title: 'Deletar Perfil?',
      description: `Tem certeza que deseja deletar o perfil '${e.nome}'?`,
    }
  }
}
