import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, UrlTree } from "@angular/router";
import { Component } from '@angular/core';
import { OnInit } from "@angular/core";
import { CnpjService } from "./../../../../@core/data/cnpj.service";
import { Cnpj } from "./../../../../models/cnpj.model";
import { AbstractEntityComponent } from "app/components/abstract";

@Component({
    selector: 'cnpj-edit',
    templateUrl: './cnpj-edit.component.html',
    styleUrls: ['./cnpj-edit.component.scss'],
  })
export class CnpjEditComponent
  extends AbstractEntityComponent<Cnpj, CnpjService>
  implements OnInit {
  
  
    constructor(
    activatedRoute: ActivatedRoute,
    service: CnpjService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar
  ) {
    super(activatedRoute, service, fb, router, new Cnpj(), snackBar);
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Cnpj): void {
    this.entity = newEntity || new Cnpj();

    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'Novo CNPJ' : 'Editar CNPJ'; }
}
