import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpresaEditComponent } from './edit/empresa-edit.component';
import { EmpresaListComponent } from './list/empresa-list.component';

@Component({template: `<router-outlet></router-outlet>`})
export class EmpresaComponent { }

export const routedComponents = [
    EmpresaComponent,
    EmpresaEditComponent,
    EmpresaListComponent,
];

const routes: Routes = [{
    path: '',
    component: EmpresaComponent,
    children: [{
        path: 'list',
        component: EmpresaListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: EmpresaEditComponent,
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
export class EmpresaRoutingModule { }
