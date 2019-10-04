import { Component, OnInit } from '@angular/core';
import { Divisao } from 'app/models/divisao.model';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { DivisaoService } from 'app/@core/data/divisao.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSelectChange } from '@angular/material';
import { AbstractEntityComponent } from 'app/components/abstract';
import { Empresa } from 'app/models/empresa.model';
import { EmpresaService } from 'app/@core/data/empresa.service';

@Component({
  selector: 'divisao-edit',
  templateUrl: './divisao-edit.component.html',
  styleUrls: ['./divisao-edit.component.scss'],
})
export class DivisaoEditComponent extends AbstractEntityComponent<Divisao, DivisaoService> implements OnInit {
  entity: Divisao;
  empresas: Empresa[] = [];

  constructor(activatedRoute: ActivatedRoute,
    service: DivisaoService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar,
    empresaService: EmpresaService) {
    super(activatedRoute, service, fb, router, new Divisao(), snackBar);
    empresaService.findAll().subscribe((e: Empresa[]) => { this.empresas = e });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Divisao): void {
    this.entity = newEntity || new Divisao();
    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'Nova divisão' : 'Editar divisão'; }

  compareEmpresas(emp1: Empresa, emp2: Empresa) {
    return emp1.id === emp2.id;
  }
}