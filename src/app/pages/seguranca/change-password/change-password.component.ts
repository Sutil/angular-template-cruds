import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AbstractEntityComponent } from 'app/components/abstract';
import { ChangePasswordService } from '../../../@core/data/changepassword.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const fgValidatorPwd: ValidatorFn = (c: AbstractControl) => {
  const formGroup = c as FormGroup
  const senhaNovaControl = formGroup.get('senhaNova')
  const sNovaCopyControl = formGroup.get('senhaNovaCopy')
  if (senhaNovaControl.value === sNovaCopyControl.value) {
    return null
  }
  return { invalidPassword: true }
}

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  title: string = 'teste';

  entityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private service: ChangePasswordService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.entityForm = this.formBuilder.group({
      senhaAtual: '',
      senhaNova: ['', Validators.minLength(6)],
      senhaNovaCopy: ['', Validators.minLength(6)]
    }, {
        validator: fgValidatorPwd
      })
  }

  checkPassword() {

  }

  async onSubmit() {
    if(!this.entityForm.valid) {
      return
    }

    try {
      await this.service.changePassword(this.entityForm.value);
      this.onSubmitSuccess();
      this.router.navigate([''])
    } catch (error) {
      this.onSubmitError(error.message);
    }
  }

  onSubmitError(error: string): void {
    if(error.includes('Senha Alterada com Sucesso')) {
      this.router.navigate([''])
    }
    const subs = this.snackBar.open('Erro: ' + error, 'OK', { duration: 5000 })
  }

  onSubmitSuccess(): void {
    const successstr = 'Senha alterada com sucesso.';
    const subs = this.snackBar.open(successstr, 'OK', { duration: 5000 })
  }
}
