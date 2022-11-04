import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    async authLogin(login: string, password: string) {
        console.log('No Service - login ', login);
        console.log('No Service - Senha ', password);
        return { login, password, msg: 'Usuário autenticado com sucesso!' };
    }
}
