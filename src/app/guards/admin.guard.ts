import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getUserLogin, isUserAuthenticated } from "../helpers/authentication.helper";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {

    constructor(
        private router: Router
    ){      
    }

    /*
        Função para fazer a verificação das rotas
        de acordo com a permissão do usuário
    */
   canActivate() {
    if(isUserAuthenticated()) {
        //capturar os dados do usuário autenticado 
        const user = getUserLogin(); 
        //verificando o nome do perfil do usuário 
        if(user?.perfil == "USER_ROLE") { 
            return true; 
        }
    }
    this.router.navigate(['/pages/login'])
    return false;
    }
}