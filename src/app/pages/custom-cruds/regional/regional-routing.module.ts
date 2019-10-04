import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegionalEditComponent } from './edit/regional-edit.component';
import { RegionalListComponent } from './list/regional-list.component';


@Component({ template: `<router-outlet></router-outlet>` })
export class RegionalComponent { }

export const routedComponents = [
    RegionalComponent,
    RegionalListComponent,
    RegionalEditComponent,
];

const routes: Routes = [{
    path: '',
    component: RegionalComponent,
    children: [{
        path: 'list',
        component: RegionalListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, {
        path: 'edit/:id',
        component: RegionalEditComponent,
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
export class RegionalRoutingModule { }
