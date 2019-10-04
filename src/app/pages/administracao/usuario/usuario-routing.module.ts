import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Component } from '@angular/core';
import { UsuarioListComponent } from './list/usuario-list.component';
import { UsuarioEditComponent } from './edit/usuario-edit.component';
import { AprovacaoComponent } from './aprovacao/aprovacao.component';

@Component({ template: `<router-outlet></router-outlet>` })
export class UsuarioComponent { }

export const routedComponents = [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioEditComponent,
    AprovacaoComponent
];

const routes: Routes = [{
    path: '',
    component: UsuarioComponent,
    children: [{
        path: 'list',
        component: UsuarioListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: UsuarioEditComponent,
    }, {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    }, {
        path: 'aprovacao',
        component: AprovacaoComponent
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
export class UsuarioRoutingModule { }
