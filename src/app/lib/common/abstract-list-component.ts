import { ColunaDefType } from './../../components/neos-abstract-list/neos-abstract-list.component';
import { ComponentType } from '@angular/cdk/portal'
import { TemplateRef } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router'
import { AbstractEntityService } from '../../@core/data/abstract-service'
import { ConfirmacaoModalComponent } from '../../components/confirmacao-modal/confirmacao-modal.component'
import { BasicEntity } from '../../models/base/basicentity.model'
import { RestDataSource } from './restdatasource'

/**
 * Template method para classes que usam o list-wrapper
 *
 * Implementa comportamentos mais comuns, como navegação para edit e add
 */
export abstract class AbstractListComponent<T extends BasicEntity> {
  abstract colunas: ColunaDefType<T>[]

  dataSource = new RestDataSource(this.service)
  constructor(
    protected service: AbstractEntityService<T>,
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
  ) {}

  abstract onAddClick()

  abstract onEditClick(entity: T)

  onDeleteClick(entity: T) {
    const { title, description } = this.deleteDialogText(entity)

    const dialogRef = this.dialog.open(ConfirmacaoModalComponent, {
      data: {
        title,
        text: description,
      },
    })

    dialogRef.afterClosed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          await this.service.remove(entity)
          this.dataSource.loadEntities()
          this.snackBar.open('Removido com sucesso.', 'OK', { duration: 2000 })
        } catch (error) {
          console.error(error)
          this.snackBar.open(error, 'OK', { duration: 2000 })
        }
      }
    })
  }

  /**
   * Retorna o texto a ser apresentado no modal de deleção
   * @param e Entidade sendo deletada
   */
  protected abstract deleteDialogText(
    e: T,
  ): { title: string; description: string }
}

/**
 * Lista que ao clicar em 'edit' ou 'add' redireciona para ../edit/{id}
 *
 */
export abstract class ListRedirectEditComponent<
  T extends BasicEntity
> extends AbstractListComponent<T> {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    service: AbstractEntityService<T>,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(service, dialog, snackBar)
  }

  onAddClick() {
    this.router.navigate(this.addNavigationCommand(), {
      relativeTo: this.activatedRoute,
    })
  }

  onEditClick(entity: T) {
    if (entity.id === undefined) {
      throw new Error('Tentando editar entidade com ID indefinido.')
    }
    this.router.navigate(this.editNavigationCommand(entity), {
      relativeTo: this.activatedRoute,
    })
  }

  /**
   * Caminho de navegação ao clicar em "adicionar"
   */
  protected addNavigationCommand = () => ['..', 'edit', 'new']

  /**
   * Caminho de navegação ao clicar em "editar"
   */
  protected editNavigationCommand = (e: T) => ['..', 'edit', `${e.id}`]
}

/**
 * Classe que, ao invés de navegar para telas de edição, abre um diálogo de edição
 */
export abstract class ListDialogEditComponent<
  T extends BasicEntity,
  D = any
> extends AbstractListComponent<T> {
  abstract editDialogComponent: ComponentType<D> | TemplateRef<D>

  onAddClick() {
    this.openDialog(null)
  }

  onEditClick(entity: T) {
    this.openDialog(entity)
  }

  /**
   * Determina se a entidade deve ser salva ao fechar o diálogo de edição.
   * @param result se true, a entidade não será salva ao fechar o diálogo de edição
   */
  abstract entityIsEmpty(result: T | null): boolean

  openDialog(entity: T | null) {
    const dialogRef = this.dialog.open(this.editDialogComponent, {
      data: entity || null,
    })

    dialogRef.afterClosed().subscribe(async (result: T) => {
      if (this.entityIsEmpty(result)) {
        return
      }

      try {
        await this.service.save(result)
        this.dataSource.loadEntities()
        this.snackBar.open('Salvo com sucesso.', 'OK', { duration: 2000 })
      } catch (error) {
        console.error(error)
        this.snackBar.open(error, 'OK', { duration: 2000 })
      }
    })
  }
}
