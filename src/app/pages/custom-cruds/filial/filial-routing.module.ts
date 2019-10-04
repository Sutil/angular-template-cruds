import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilialEditComponent } from './edit/filial-edit.component';
import { FilialListComponent } from './list/filial-list.component';


@Component({ template: `<router-outlet></router-outlet>` })
export class FilialComponent { }

export const routedComponents = [
    FilialComponent,
    FilialListComponent,
    FilialEditComponent,
];

const routes: Routes = [{
    path: '',
    component: FilialComponent,
    children: [{
        path: 'list',
        component: FilialListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: FilialEditComponent,
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
export class FilialRoutingModule { }
