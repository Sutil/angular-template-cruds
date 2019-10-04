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
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { EnumToArrayPipeModule } from '../../../enum-to-array';


export class Brand extends BasicEntity {
  public name: string = '';
}

class BrandMockService extends AbstractEntityServiceMock<Brand> {
  constructor(http: HttpClient) {
    super(http)
  }
  getBaseUrl(): string {
    return environment.urlBrand();
  }
  getEntityName(): string {
    return 'Brand';
  }
  newEntity(): Brand {
    return new Brand();
  }

  async count() {
    const lista = await this.findAll().toPromise();
    return lista.length;
  }
}

@Injectable({
  providedIn: 'root',
  useClass: environment.production ? BrandService : BrandMockService,
})
export class BrandService extends AbstractEntityService<Brand> {

  getBaseUrl(): string {
    return environment.urlBrand();
  }
  getEntityName(): string {
    return 'Brand';
  }
  newEntity(): Brand {
    return new Brand();
  }

  async count() {
    const lista = await this.findAll().toPromise();
    return lista.length;
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}


@Component({
  selector: 'brand-list',
  template: `
    <neos-abstract-list [dataSource]="dataSource"
                        [colunas]="colunas"
                        (editButtonClicked)="onEditClick($event)"
                        (addButtonClicked)="onAddClick()"
                        (deleteButtonClicked)="onDeleteClick($event)">
                <h1 list-header>Brand</h1>
    </neos-abstract-list>`,
})
export class BrandListComponent extends ListRedirectEditComponent<Brand> {
  colunas = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: Brand) => `${row.name}`,
      sortable: true,
    },
  ]

  constructor(
    service: BrandService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Brand,
  ): { title: string; description: string } {
    return {
      title: `Remove brand?`,
      description: `Are yout sure that want to remove ${e.name}?`,
    }
  }
}

@Component({
  selector: 'brand-edit',
  template: `<form-wrapper [formTitle]="title" [component]="this">
              <div [formGroup]="entityForm">
                <div class="row">
                  <mat-form-field class="col-12 col-md-6">
                    <input matInput name="name" formControlName="name" placeholder="Name" required/>
                  </mat-form-field>
                </div>
              </div>
            </form-wrapper>`,
})
export class BrandEditComponent extends AbstractEntityComponent<Brand, BrandService> implements OnInit {
  entity: Brand;

  constructor(activatedRoute: ActivatedRoute,
    service: BrandService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar) {
    super(activatedRoute, service, fb, router, new Brand(), snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Brand): void {
    this.entity = newEntity || new Brand();
    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'New Brand' : 'Edit Brand'; }
}

@Component({ template: `<router-outlet></router-outlet>` })
export class BrandComponent { }

export const routedComponents = [
    BrandComponent,
    BrandListComponent,
    BrandEditComponent,
];

const routes: Routes = [{
    path: '',
    component: BrandComponent,
    children: [{
        path: 'list',
        component: BrandListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: BrandEditComponent,
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
export class BrandRoutingModule { }


@NgModule({
  imports: [
    CommonModule,
    BrandRoutingModule,
    NeosAbstractListModule,
    FormWrapperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    ConfirmacaoModalModule,
    EnumToArrayPipeModule,
  ],
  declarations: [...routedComponents],
})
export class BrandModule { }
