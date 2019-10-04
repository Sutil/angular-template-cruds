import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Rx'
import { CheckToken } from '../@core/data/checktoken.service'

const NOAUTHORIZED: number = 401
const FORBIDEN: number = 403
const OK: number = 200

@Injectable()
export class AuthGuard implements CanActivate {
    returnUrl: string

    constructor(private checkToken: CheckToken) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkToken.canActivate(route, state)
    }
}
