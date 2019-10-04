import { HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable, of as observableOf } from 'rxjs'
import { map } from 'rxjs/operators'
import { Usuario } from '../../models/usuario.model'

@Injectable()
export class AutenticacaoService implements CanActivate {
    returnUrl: string

    constructor(private router: Router) {}

    async login(user: Usuario) {
        return observableOf(new HttpResponse<Object>())
            .pipe(
                map(() => {
                    localStorage.setItem('userToken', 'JWT_token')
                }),
            )
            .toPromise()
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        this.returnUrl = state.url || '/'

        if (!this.isLogged()) {
            await this.logout(this.returnUrl)
            return false
        }

        return true
    }

    isLogged() {
        const token = localStorage.getItem('userToken')
        if (token) {
            return true
        }

        return false
    }

    async logout(returnUrl?: string) {
        localStorage.removeItem('userToken')
        return this.router.navigate(
            ['login'],
            returnUrl ? { queryParams: { returnUrl } } : undefined,
        )
    }
}
