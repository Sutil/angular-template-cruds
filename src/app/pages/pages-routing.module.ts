import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: PagesComponent,
  children: [ {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  },
  {
    path: 'administracao',
    canActivate: [AuthGuard],
    loadChildren: './administracao/administracao.module#AdministracaoModule',
  },
  {
    path: 'configuracao',
    canActivate: [AuthGuard],
    loadChildren: './configuracao/configuracao.module#ConfiguracaoModule',
  },
  {
    path: 'seguranca',
    canActivate: [AuthGuard],
    loadChildren: './seguranca/change-password/change-password.module#ChangePasswordModule',
  },
  {
    path: 'sobre',
    canActivate: [AuthGuard],
    loadChildren: './sobre/sobre.module#SobreModule',
  },
  {
    path: 'cadastros',
    canActivate: [AuthGuard],
    loadChildren: './custom-cruds/cadastros.module#CadastrosModule',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
