import { Component, OnInit } from '@angular/core';
import { AbstractEntityComponent } from 'app/components/abstract';
import { Filial } from 'app/models/filial.model';
import { FilialService } from 'app/@core/data/filial.service';
import { Regional } from 'app/models/regional.model';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RegionalService } from 'app/@core/data/regional.service';

@Component({
  selector: 'filial-edit',
  templateUrl: './filial-edit.component.html',
  styleUrls: ['./filial-edit.component.scss'],
})
export class FilialEditComponent extends AbstractEntityComponent<Filial, FilialService> implements OnInit {
  entity: Filial;
  regionais: Regional[] = [];

  constructor(activatedRoute: ActivatedRoute,
    service: FilialService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar,
    regionalService: RegionalService) {
    super(activatedRoute, service, fb, router, new Filial(), snackBar);
    regionalService.findAll().subscribe((r: Regional[]) => { this.regionais = r });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Filial): void {
    this.entity = newEntity || new Filial();
    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'New Business' : 'Edit Business'; }

  compareRegionais(reg1: Regional, reg2: Regional) {
    return reg1.id === reg2.id;
  }
}