import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'app/auth/auth.service'
import { ApplicationUser } from '../models/applicationuser.model'

@Component({
    selector: 'wtc-auth-comp',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    isWaiting: boolean = false
    user = new ApplicationUser()
    entityForm: FormGroup
    returnUrl: string

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        fb: FormBuilder,
    ) {
        this.entityForm = fb.group(this.user)
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
    }


    async login() {
        this.user = this.entityForm.value

        this.isWaiting = true
        try {
            await this.authService.login(this.user)
            await this.router.navigate([this.returnUrl])
        } catch (err) {
            alert('Falha na autenticação')
        } finally {
            this.isWaiting = false
        }
    }
}
