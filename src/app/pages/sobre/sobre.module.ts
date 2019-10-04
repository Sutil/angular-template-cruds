import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SobreComponent } from './sobre.component';
import { Routes, RouterModule } from '@angular/router';
import { 
  MatCardModule,
  MatIconModule } from '@angular/material';

@Component({ template: `<router-outlet></router-outlet>` })
export class SobreRouteComponent { }
const routes:Routes = [{
  path: '',
  component: SobreRouteComponent,
  children: [
    {
      path: '',
      component: SobreComponent,
    }
  ]
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    SobreComponent,
    SobreRouteComponent
  ]
})
export class SobreModule { }
