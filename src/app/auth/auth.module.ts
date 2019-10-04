import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { ForgotPassordComponent } from "./forgot-passord/forgot-passord.component";
import { RecoverPasswordComponent } from "./recover-password/recover-password.component";
import { ConfirmacaoModalModule } from "../components/confirmacao-modal/confirmacao-modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ConfirmacaoModalModule,
    MatDialogModule,
    RouterModule.forChild([
      { path: "", component: AuthComponent },
      { path: "forgotpassword", component: ForgotPassordComponent },
      { path: "recoverpassword/:hash", component: RecoverPasswordComponent },
      { path: "**", redirectTo: "" }
    ])
  ],
  declarations: [
    AuthComponent,
    ForgotPassordComponent,
    RecoverPasswordComponent,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AuthComponentModule {}
