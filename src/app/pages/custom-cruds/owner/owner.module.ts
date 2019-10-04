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


export class Owner extends BasicEntity {
  public name: string = '';
}

class OwnerMockService extends AbstractEntityServiceMock<Owner> {
  constructor(http: HttpClient) {
    super(http)
  }
  getBaseUrl(): string {
    return './assets/mock/owner.findall.json';
  }
  getEntityName(): string {
    return 'Owner';
  }
  newEntity(): Owner {
    return new Owner();
  }
}

@Injectable({
  providedIn: 'root',
  useClass: environment.production ? OwnerService : OwnerMockService,
})
export class OwnerService extends AbstractEntityService<Owner> {

  getBaseUrl(): string {
    return '/url/to/backend/endpoint';
  }
  getEntityName(): string {
    return 'Owner';
  }
  newEntity(): Owner {
    return new Owner();
  }

  constructor(protected http: HttpClient) {
    super(http);
  }
}


@Component({
  selector: 'owner-list',
  template: `
    <neos-abstract-list [dataSource]="dataSource"
                        [colunas]="colunas"
                        (editButtonClicked)="onEditClick($event)"
                        (addButtonClicked)="onAddClick()"
                        (deleteButtonClicked)="onDeleteClick($event)">
                <h1 list-header>Owner</h1>
    </neos-abstract-list>`,
})
export class OwnerListComponent extends ListRedirectEditComponent<Owner> {
  colunas = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: Owner) => `${row.name}`,
      sortable: true,
    },
  ]

  constructor(
    service: OwnerService,
    router: Router,
    activatedRoute: ActivatedRoute,
    dialog: MatDialog,
    snackBar: MatSnackBar,
  ) {
    super(router, activatedRoute, service, dialog, snackBar)
  }

  protected deleteDialogText(
    e: Owner,
  ): { title: string; description: string } {
    return {
      title: `Remove owner?`,
      description: `Are yout sure that want to remove ${e.name}?`,
    }
  }
}

@Component({
  selector: 'owner-edit',
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
export class OwnerEditComponent extends AbstractEntityComponent<Owner, OwnerService> implements OnInit {
  entity: Owner;

  constructor(activatedRoute: ActivatedRoute,
    service: OwnerService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar) {
    super(activatedRoute, service, fb, router, new Owner(), snackBar);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: Owner): void {
    this.entity = newEntity || new Owner();
    this.entityForm.patchValue(this.entity);
  }

  get title() { return this.isNew ? 'New Owner' : 'Edit Owner'; }
}

@Component({ template: `<router-outlet></router-outlet>` })
export class OwnerComponent { }

export const routedComponents = [
    OwnerComponent,
    OwnerListComponent,
    OwnerEditComponent,
];

const routes: Routes = [{
    path: '',
    component: OwnerComponent,
    children: [{
        path: 'list',
        component: OwnerListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: OwnerEditComponent,
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
export class OwnerRoutingModule { }


@NgModule({
  imports: [
    CommonModule,
    OwnerRoutingModule,
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
export class OwnerModule { }
