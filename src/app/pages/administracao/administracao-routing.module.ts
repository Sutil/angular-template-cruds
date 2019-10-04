import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

@Component({ template: `<router-outlet></router-outlet>` })
export class AdministracaoComponent { }

export const routedComponents = [
  AdministracaoComponent,
];

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: AdministracaoComponent,
  children: [
    {
      path: 'empresa',
      canActivate: [AuthGuard],
      loadChildren: './empresa/empresa.module#EmpresaModule',
    },
    {
      path: 'usuario',
      loadChildren: './usuario/usuario.module#UsuarioModule',
    },
    {
      path: 'perfil',
      loadChildren: './perfil/perfil.module#PerfilModule',
    },
    {
      path: 'recurso',
      loadChildren: './recurso/recurso.module#RecursoModule',
    },
    {
      path: 'cnpj',
      loadChildren: './cnpj/cnpj.module#CnpjModule',
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
export class AdministracaoRoutingModule { }
