import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecoverPasswordService } from './recover-password.service';
import { RedefinePassword } from './redefinepassword.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  entityForm: FormGroup;
  isWaiting: boolean = false;
  hasError: boolean = false;
  messageError: string = '';
  redefinePassword: RedefinePassword = new RedefinePassword();

  constructor(
    private fb: FormBuilder,
    private service: RecoverPasswordService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.entityForm = fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.redefinePassword.hash = this.activatedRoute.snapshot.paramMap.get('hash');
  }

  async redefinir() {
    this.isWaiting = true;
    try {
      this.redefinePassword.newPassword = this.entityForm.value.newPassword;
      this.redefinePassword.confirmPassword = this.entityForm.value.confirmPassword;

      await this.service.redefinirSenha(this.redefinePassword);

      this.hasError = false;
      this.messageError = '';
      this.message('Senha redefinida com sucesso.');
      this.router.navigate(['login'])

    } catch (error) {
      this.hasError = true;
      this.messageError = error;
    }
    finally {
      this.isWaiting = false;
    }
  }

  message(msg) {
    this.snackBar.open(
      msg, null,
      { duration: 5000 });
  }

}
