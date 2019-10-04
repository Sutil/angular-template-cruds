import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({ template: `<router-outlet></router-outlet>` })
export class CadastrosComponent { }

export const routedComponents = [
  CadastrosComponent,
];

const routes: Routes = [{
  path: '',
  component: CadastrosComponent,
  children: [
    {
      path: 'filial',
      loadChildren: './filial/filial.module#FilialModule',
    },
    {
      path: 'brand',
      loadChildren: './brand/brand.module#BrandModule',
    },
    {
      path: 'model',
      loadChildren: './model/model.module#ModelModule',
    },
    {
      path: 'owner',
      loadChildren: './owner/owner.module#OwnerModule',
    },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CadastrosRoutingModule { }
