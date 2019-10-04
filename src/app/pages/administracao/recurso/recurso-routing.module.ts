import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecursoEditComponent } from './edit/recurso-edit.component';
import { RecursoListComponent } from './list/recurso-list.component';

import { Component } from '@angular/core';

@Component({ template: `<router-outlet></router-outlet>` })
export class RecursoComponent { }

export const routedComponents = [
    RecursoComponent,
    RecursoListComponent,
    RecursoEditComponent,
];

export const routes: Routes = [{
    path: '',
    component: RecursoComponent,
    children: [{
        path: 'list',
        component: RecursoListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: RecursoEditComponent,
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
export class RecursoRoutingModule { }
