import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'usuario_perfil_organizacao',
    loadChildren: './usuario-perfil-organizacao/usuario-perfil-organizacao.module#UsuarioPerfilOrganizacaoModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ConfiguracaoRoutingModule { }
