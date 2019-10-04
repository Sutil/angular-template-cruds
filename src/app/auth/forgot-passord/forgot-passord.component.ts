import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../../@core/data/forgotpassword.service';
import { ConfirmacaoModalComponent } from '../../components/confirmacao-modal/confirmacao-modal.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'forgot-passord',
  templateUrl: './forgot-passord.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPassordComponent implements OnInit {
  isWaiting: boolean = false;
  entityForm: FormGroup;

  obj: { email: string } = { email: '' };

  constructor(
    fb: FormBuilder,
    private service: ForgotPasswordService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.entityForm = fb.group(this.obj);
  }

  ngOnInit() {
    this.entityForm.patchValue(this.obj);
  }

  async recuperar() {
    try {
      await this.service.recuperaSenha(this.entityForm.value);
      this.message('E-mail enviado com sucesso');
      this.openDialog();
    } catch (error) {
      this.message(error.message);
    }
  }

  message(msg) {
    this.snackBar.open(msg, null, { duration: 5000 });
  }

  openDialog() {
    const dialogRef = this.dialog.open<
      ConfirmacaoModalComponent,
      { title: string; text: string; noButton: string; yesButton: string },
      boolean
    >(ConfirmacaoModalComponent, {
      data: {
        title: 'E-mail de recuperação enviado',
        text: 'Enviamos instruções de recuperação de senha para seu endereço de e-mail.',
        noButton: 'Sair',
        yesButton: 'Ir para login',
      }
    });

    const sub = dialogRef.afterClosed().subscribe(async confirmed => {
      if (confirmed) {
        this.router.navigate(['/login']);
        sub.unsubscribe();
      }
    });
  }
}
