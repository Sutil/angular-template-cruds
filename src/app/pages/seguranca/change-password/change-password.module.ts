import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatIconModule,
} from '@angular/material';


@Component({ template: `<router-outlet></router-outlet>` })
export class ChangePasswordRouteComponent { }
const routes: Routes = [{
  path: '',
  component: ChangePasswordRouteComponent,
  children: [
    {
      path: 'changepassword',
      component: ChangePasswordComponent,
    }
  ]
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    FormWrapperModule,
    MatSnackBarModule,
    MatInputModule,
    HttpModule,
  ],
  declarations: [
    ChangePasswordRouteComponent,
    ChangePasswordComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ChangePasswordModule { }
