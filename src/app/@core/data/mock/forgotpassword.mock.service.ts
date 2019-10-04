import { Injectable } from '@angular/core';
import {of as observableOf,  Observable } from 'rxjs';

@Injectable()
export class ForgotPasswordMockService {
    async recuperaSenha(email): Promise<any> {
        return await observableOf(true).toPromise();
    }
}
