import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilEditComponent } from './edit/perfil-edit.component';
import { PerfilListaComponent } from './list/perfil.component';

import { Component } from '@angular/core';

@Component({ template: `<router-outlet></router-outlet>` })
export class PerfilComponent { }

export const routedComponents = [
    PerfilComponent,
    PerfilListaComponent,
    PerfilEditComponent,
];

const routes: Routes = [{
    path: '',
    component: PerfilComponent,
    children: [{
        path: 'list',
        component: PerfilListaComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: PerfilEditComponent,
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
export class PerfilRoutingModule { }
