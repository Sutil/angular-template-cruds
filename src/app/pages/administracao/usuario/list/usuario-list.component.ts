import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { UsuarioService } from 'app/@core/data/usuario.service'
import { Usuario } from 'app/models/usuario.model'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'
import { StatusUsuario } from '../../../../models/statususuario.enum'
import { TipoUsuario } from '../../../../models/tipousuario.enum'

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss'],
})
export class UsuarioListComponent extends ListRedirectEditComponent<Usuario> {
  colunas = [
    {
      columnDef: 'username',
      header: 'Login',
      cell: (row: Usuario) => `${row.username}`,
      sortable: true,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: Usuario) => `${row.name}`,
      sortable: true,
    },
  ]

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    service: UsuarioService,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Usuario,
  ): { title: string; description: string } {
    return {
      title: 'Delete User',
      description: `Are you sure that want to delete '${e.name}'?`,
    }
  }
}
