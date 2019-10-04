import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DivisaoEditComponent } from './edit/divisao-edit.component';
import { DivisaoListComponent } from './list/divisao-list.component';


@Component({ template: `<router-outlet></router-outlet>` })
export class DivisaoComponent { }

export const routedComponents = [
    DivisaoComponent,
    DivisaoListComponent,
    DivisaoEditComponent,
];

const routes: Routes = [{
    path: '',
    component: DivisaoComponent,
    children: [{
        path: 'list',
        component: DivisaoListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: DivisaoEditComponent,
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
export class DivisaoRoutingModule { }
