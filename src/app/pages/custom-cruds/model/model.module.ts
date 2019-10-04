import { Brand } from './../brand/brand.module';
import { ConfirmacaoModalModule } from './../../../components/confirmacao-modal/confirmacao-modal.module';
import { FormWrapperModule } from './../../../components/form-wrapper/form-wrapper.module';
import { NeosAbstractListModule } from './../../../components/neos-abstract-list/neos-abstract-list.module';
import { OnInit } from '@angular/core';
import { AbstractEntityComponent } from 'app/components/abstract';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractEntityService } from 'app/@core/data/abstract-service';
import { Injectable } from '@angular/core';
import { BasicEntity } from 'app/models/base/basicentity.model';
import { RouterModule, ActivatedRoute, Routes, Router, UrlTree } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRedirectEditComponent } from '../../../lib/common/abstract-list-component';
import { AbstractEntityServiceMock } from '../../../@core/data/mock/abstract-mock-service';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatAutocompleteModule } from '@angular/material';
import { EnumToArrayPipeModule } from '../../../enum-to-array';
import { startWith, map } from 'rxjs/operators';



export class Model extends BasicEntity {
  public name: string = '';
}

class ModelMockService extends AbstractEntityServiceMock<Model> {
  constructor(http: HttpClient) {
    super(http)
  }
  getBaseUrl(): string {
    return environment.urlModel();
  }
  getEntityName(): string {
    return 'Model';
  }
  newEntity(): Model {
    return new Model();
  }

  async count() {
    const lista = await this.findAll().toPromise();
    return lista.length;
  }
}

@Injectable({
  providedIn: 'root',
  useClass: environment.production ? ModelService : ModelMockService,
})
export class ModelService extends AbstractEntityService<Model> {

  getBaseUrl(): string {
    return environment.urlModel();
  }
  getEntityName(): string {
    return 'Model';
  }
  newEntity(): Model {
    return new Model();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}


@Component({
  selector: 'model-list',
  template: `
    <neos-abstract-list [dataSource]="dataSource"
                        [colunas]="colunas"
                        (editButtonClicked)="onEditClick($event)"
                        (addButtonClicked)="onAddClick()"
                        (deleteButtonClicked)="onDeleteClick($event)">
                <h1 list-header>Model</h1>
    </neos-abstract-list>`,
})
export class ModelListComponent extends ListRedirectEditComponent<Model> {
  colunas = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: Model) => `${row.name}`,
      sortable: true,
    },
  ]

  constructor(
    service: ModelService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Model,
  ): { title: string; description: string } {
    return {
      title: `Remove model?`,
      description: `Are yout sure that want to remove ${e.name}?`,
    }
  }
}

@Component({
  selector: 'model-edit',
  template: `<form-wrapper [formTitle]="title" [component]="this">
              <div [formGroup]="entityForm">
                <div class="row">
                  <mat-form-field class="col-12 col-md-6">
                    <input matInput name="name" formControlName="name" placeholder="name" required/>
                  </mat-form-field>

                </div>
              </div>
            </form-wrapper>`,
})
export class ModelEditComponent extends AbstractEntityComponent<Model, ModelService> implements OnInit {
  entity: Model;

  constructor(activatedRoute: ActivatedRoute,
    service: ModelService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar) {
    super(activatedRoute, service, fb, router, new Model(), snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  _filterBrand(value): Brand[] {
    return [];
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Model): void {
    this.entity = newEntity || new Model();
    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'New Model' : 'Edit Model'; }
}

@Component({ template: `<router-outlet></router-outlet>` })
export class ModelComponent { }

export const routedComponents = [
    ModelComponent,
    ModelListComponent,
    ModelEditComponent,
];

const routes: Routes = [{
    path: '',
    component: ModelComponent,
    children: [{
        path: 'list',
        component: ModelListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: ModelEditComponent,
    }, {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    }],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ModelRoutingModule { }


@NgModule({
  imports: [
    CommonModule,
    ModelRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    ConfirmacaoModalModule,
    EnumToArrayPipeModule,
  ],
  declarations: [...routedComponents],
})
export class ModelModule { }
