import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AbstractEntityComponent } from 'app/components/abstract';
import { CustomValidators } from '../../../../components/validators/custom-validators';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Metodo } from './../../../../models/metodo.enum';
import { Recurso } from 'app/models/recurso.model';
import { RecursoService } from 'app/@core/data/recurso.service';

@Component({
  selector: 'recurso-edit',
  templateUrl: './recurso-edit.component.html',
  styleUrls: ['./recurso-edit.component.scss'],
})
export class RecursoEditComponent extends AbstractEntityComponent<Recurso, RecursoService> implements OnInit {

  metodos = Metodo;

  constructor(activatedRoute: ActivatedRoute,
    service: RecursoService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar) {
    super(activatedRoute, service, fb, router, new Recurso(), snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
    // Bug do angular precisa que sete o required forçadamente
    const metodo = this.entityForm.controls['metodo'];
    metodo.setValidators(CustomValidators.required);
    this.entityForm.updateValueAndValidity();
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Recurso): void {
    this.entity = newEntity || new Recurso();

    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'New Resource' : 'Edit Resource'; }
}