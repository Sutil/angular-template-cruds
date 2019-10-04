import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioPerfilOrganizacaoEditComponent } from './edit/usuario-perfil-organizacao-edit.component';
import { UsuarioPerfilOrganizacaoListComponent } from './list/usuario-perfil-organizacao-list.component';

@Component({template: `<router-outlet></router-outlet>`})
export class UsuarioPerfilOrganizacaoComponent { }

export const routedComponents = [
    UsuarioPerfilOrganizacaoComponent,
    UsuarioPerfilOrganizacaoEditComponent,
    UsuarioPerfilOrganizacaoListComponent,
];

const routes: Routes = [{
    path: '',
    component: UsuarioPerfilOrganizacaoComponent,
    children: [{
        path: 'list',
        component: UsuarioPerfilOrganizacaoListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: UsuarioPerfilOrganizacaoEditComponent,
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
export class UsuarioPerfilOrganizacaoRoutingModule { }
