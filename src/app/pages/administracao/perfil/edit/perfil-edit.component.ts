import { Recurso } from 'app/models/recurso.model';
import { RecursoService } from './../../../../@core/data/recurso.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { PerfilService } from 'app/@core/data/perfil.service';
import { AbstractEntityComponent } from 'app/components/abstract';
import { Perfil } from 'app/models/perfil.model';
import { CustomValidators } from '../../../../components/validators/custom-validators';

@Component({
  selector: 'perfil',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.scss'],
})
export class PerfilEditComponent extends AbstractEntityComponent<Perfil, PerfilService> implements OnInit {

  constructor(activatedRoute: ActivatedRoute,
    service: PerfilService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar,
    private dialog: MatDialog,
    private recursoService: RecursoService) {
    super(activatedRoute, service, fb, router, new Perfil(), snackBar);
    this.entityForm = fb.group({
      nome: this.fb.control('', Validators.required),
      recursos: this.fb.control([], CustomValidators.minLengthArray(1))
    })
  }

  displayedCols = [
    { columnDef: 'url', header: 'URL', cell: (row: Recurso) => `${row.name}`, sortable: true }
  ];

  updateEntity(newEntity?: Perfil): void {
    this.entity = newEntity || new Perfil();
    this.entityForm.patchValue(this.entity);
  }

  getListUrlRoute(): UrlTree {
    // perfil/edit/new => perfil
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  get title() {
    return this.isNew ? 'Novo Perfil' : 'Editar Perfil';
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onChangeSelected() {
    this.entityForm.get('recursos').updateValueAndValidity();
  }
}