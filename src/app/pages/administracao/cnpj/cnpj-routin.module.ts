import { CnpjEditComponent } from './edit/cnpj-edit.component';
import { CnpjListComponent } from './list/cnpj-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({ template: `<router-outlet></router-outlet>` })
export class CnpjComponent { }


export const cnpjRoutedComponents = [
    CnpjComponent,
    CnpjListComponent,
    CnpjEditComponent
]

export const routes: Routes = [{
    path: '',
    component: CnpjComponent,
    children: [{
        path: 'list',
        component: CnpjListComponent,
    }, {
        path: 'edit',
        redirectTo: 'edit/new',
        pathMatch: 'full',
    }, 
    {
        path: 'edit/:id',
        component: CnpjEditComponent,
    }, 
    {
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
export class CnpjRoutingModule { }