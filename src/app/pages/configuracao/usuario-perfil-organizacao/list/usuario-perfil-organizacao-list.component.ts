import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { UsuarioPerfilOrganizacaoService } from '../../../../@core/data/usuario-perfil-organizacao.service'
import { ListRedirectEditComponent } from '../../../../lib/common/abstract-list-component'
import { UsuarioPerfilOrganizacao } from '../../../../models/usuarioperfilorganizacao.model'

@Component({
  selector: 'usuario-perfil-organizacao-list',
  templateUrl: './usuario-perfil-organizacao-list.component.html',
  styleUrls: ['./usuario-perfil-organizacao-list.component.scss'],
})
export class UsuarioPerfilOrganizacaoListComponent extends ListRedirectEditComponent<
  UsuarioPerfilOrganizacao
> {
  colunas = [
    {
      columnDef: 'user.name',
      header: 'User Name',
      cell: (row: UsuarioPerfilOrganizacao) => `${row.usuario.name}`,
      sortable: false,
    },
    {
      columnDef: 'name',
      header: 'Profile Name',
      cell: (row: UsuarioPerfilOrganizacao) => `${row.perfil.nome}`,
      sortable: true,
    },
  ]

  constructor(
    service: UsuarioPerfilOrganizacaoService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: UsuarioPerfilOrganizacao,
  ): { title: string; description: string } {
    return {
      title: `Remover relacionamento?`,
      description: `Tem certeza que deseja remover o relacionamento?`,
    }
  }
}
