import { Component, OnInit } from '@angular/core';
import { Empresa } from 'app/models/empresa.model';
import { EmpresaService } from 'app/@core/data/empresa.service';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { RecursoService } from 'app/@core/data/recurso.service';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AbstractEntityComponent } from '../../../../components/abstract';

@Component({
  selector: 'empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.scss'],
})
export class EmpresaEditComponent extends AbstractEntityComponent<Empresa, EmpresaService> implements OnInit {

  entity: Empresa;

  constructor(activatedRoute: ActivatedRoute,
    service: EmpresaService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar) {
    super(activatedRoute, service, fb, router, new Empresa(), snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Empresa): void {
    this.entity = newEntity || new Empresa();

    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'Nova empresa' : 'Editar empresa'; }
}