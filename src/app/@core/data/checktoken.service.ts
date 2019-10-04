import { of as observableOf } from 'rxjs'

import { catchError, map } from 'rxjs/operators'
import { environment } from './../../../environments/environment'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs/Rx'
import { Injectable } from '@angular/core'

@Injectable()
export class CheckToken {
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

        try {
            await this.http
                .get(environment.urlCheckToken(), { headers: this.getHeaders() })
                .toPromise()
            return true
        } catch (error) {
            const e = error as HttpResponse<any>
            if (e.status === 403) {
                this.router.navigate(['/login'])
            } else {
                this.logout()
                this.router.navigate(['/login'])
            }
            return false
        }
    }

    logout() {
        localStorage.removeItem('userToken')
    }

    getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        })
        return headers
    }
}
