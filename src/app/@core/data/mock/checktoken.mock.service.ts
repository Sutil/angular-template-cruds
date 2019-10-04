import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'

@Injectable()
export class CheckTokenMock {
    returnUrl: string

    constructor(private router: Router, private http: HttpClient) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        this.returnUrl = state.url || '/'

        if (!localStorage.getItem('userToken')) {
            this.router.navigate(['login'], {
                queryParams: { returnUrl: this.returnUrl },
            })
            return false
        }

        return true
    }
}
