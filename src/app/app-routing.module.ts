import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from 'app/auth/auth.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  { path: 'login', loadChildren: 'app/auth/auth.module#AuthComponentModule' },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  enableTracing: false,
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
