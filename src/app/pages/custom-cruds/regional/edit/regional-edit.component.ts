import { Component, OnInit } from '@angular/core';
import { AbstractEntityComponent } from 'app/components/abstract';
import { RegionalService } from 'app/@core/data/regional.service';
import { Divisao } from 'app/models/divisao.model';
import { UrlTree, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DivisaoService } from 'app/@core/data/divisao.service';
import { Regional } from 'app/models/regional.model';

@Component({
  selector: 'regional-edit',
  templateUrl: './regional-edit.component.html',
  styleUrls: ['./regional-edit.component.scss'],
})
export class RegionalEditComponent extends AbstractEntityComponent<Regional, RegionalService> implements OnInit {
  entity: Regional;
  divisoes: Divisao[] = [];

  constructor(activatedRoute: ActivatedRoute,
    service: RegionalService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar,
    divisaoService: DivisaoService) {
    super(activatedRoute, service, fb, router, new Regional(), snackBar);
    divisaoService.findAll().subscribe((d: Divisao[]) => { this.divisoes = d });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Regional): void {
    this.entity = newEntity || new Regional();
    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'Nova regional' : 'Editar regional'; }

  compareDivisoes(div1: Divisao, div2: Divisao) {
    return div1.id === div2.id;
  }
}