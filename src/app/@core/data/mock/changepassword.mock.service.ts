import { ChangePassword } from "../changepassword.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ChangePasswordServiceMock {

    async changePassword(senhas: ChangePassword){
        return 401;
    }
}