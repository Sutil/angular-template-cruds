import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { AbstractEntityService } from 'app/@core/data/abstract-service';
import { BasicEntity } from 'app/models/base/basicentity.model';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export abstract class AbstractEntityComponent<E extends BasicEntity, S extends AbstractEntityService<E>>
  implements OnInit {
  /**
   * Entidade que é referenciada por este componente
   */
  entity: E;

  /**
   * Método que constrói o objeto do formulário
   */
  protected buildForm(): void { }

  /**
   * Atualiza a entidade do componente. Chamada toda vez que o componente tiver
   * que atualizar sua entidade
   * (ex. create/update/trocar id)
   * @param newEntity Nova entidade
   */
  abstract updateEntity(newEntity?: E): void;

  abstract getListUrlRoute(): UrlTree;

  /**
   * Determina se a entidade é nova(criação) ou não(atualização)
   */
  get isNew(): boolean { return !this.entity.id || this.entity.id === -1; }

  public entityForm: FormGroup;

  private _loading: Boolean = false;

  get loading() { return this._loading; }
  set loading(val: Boolean) {
    this._loading = val;
    if (val) {
      this.entityForm.disable();
    } else {
      this.entityForm.enable();
    }
  }

  get submitButtonText(): string {
    return this.isNew ? 'Insert' : 'Save';
  }

  constructor(
    protected activatedRoute: ActivatedRoute, protected service: S,
    protected fb: FormBuilder, protected router: Router, _entity: E,
    private snackBar: MatSnackBar) {
    this.entity = _entity;
    this.entityForm = this.fb.group(this.entity);
    this.buildForm();
  }

  private paramSub: Subscription;
  ngOnInit(): void {
    console.log('init');
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }

    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(
        p => this.service.findById(Number(p.id)),
      ))
      .subscribe((e: E) => this.updateEntity(e));
  }

  /**
   * Função executada ANTES de realizar a submissão de um formulário
   */
  preSubmit() { }

  async onSubmit(rawValue: Boolean = true): Promise<void> {


    this.preSubmit();
    this.loading = true;

    const formValue =
      rawValue ? this.entityForm.getRawValue() : this.entityForm.value;


    const id = this.entity.id;
    this.entity = <E>formValue;
    this.entity.id = id;

    const submitFunc: (_: E) => Promise<E> =
      (this.isNew ? this.service.create : this.service.save)
        .bind(this.service);

    try {
      const e: E = await submitFunc(this.entity);
      this.onSubmitSuccess(e);
    } catch (error) {
      this.onSubmitError(error);
    }
    this.loading = false;
  }

  onSubmitSuccess(entity: E): void {
    this.updateEntity(entity);

    let successstr = this.service.getEntityName() + ' successfully saved';
    if (this.service.getEntityName().endsWith('a') ||
      this.service.getEntityName().endsWith('al')) {
      successstr = this.service.getEntityName() + ' successfully saved';
    }

    const subs = this.snackBar.open(successstr, 'OK', { duration: 5000 })
      .afterOpened()
      .subscribe(() => {
        if (this.getListUrlRoute()) {
          this.router.navigateByUrl(this.getListUrlRoute());
        }
        subs.unsubscribe();
      });
  }

  onSubmitError(error: any) {
    const subs = this.snackBar.open(
      'Erro ao salvar ' + this.service.getEntityName(), null,
      { duration: 5000 })
      .afterOpened()
      .subscribe(() => {
        console.error(error);
        subs.unsubscribe();
      });
  }

  navigateToId(newId: number | string) {
    return this.router.navigate(['..', newId.toString()], { relativeTo: this.activatedRoute });
  }

  voltar() { this.router.navigateByUrl(this.getListUrlRoute()); }
}
