import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from 'app/@core/data/config.service'
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators'
import { ApplicationUser } from '../models/applicationuser.model'

/**
 * Serviço que abstrai operações de login
 */
@Injectable()
export class AuthService {
    constructor(private config: ConfigService, private http: HttpClient, private router: Router) {}

    async login(user: ApplicationUser) {
        return this.http
            .post(environment.urlLogin(), user, { observe: 'response', headers: this.getHeaders() })
            .pipe(
                map((res) => {
                    const jwt: string = res.headers.get('Authorization')
                    const token: string = jwt.substr(7, jwt.length - 5)

                    localStorage.setItem('userToken', token)
                }),
            )
            .toPromise()
    }

    async logout() {
        await this.http.post(environment.urlLogout(), '', { headers: this.getHeadersLogout() })

        localStorage.removeItem('userToken')
        return this.router.navigate(['/login'])
    }

    getHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
        headers.append('Accept', 'application/json')
        headers.append('Content-Type', 'application/json')
        return headers
    }

    getHeadersLogout(): HttpHeaders {
        const headers = new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'appplication/json',
            Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        })

        return headers
    }
}
