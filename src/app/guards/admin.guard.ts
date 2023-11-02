import { Injectable } from "@angular/core"; 
import { Router } from "@angular/router"; 
import { isUserAuthenticated } from "../helpers/authentication.helper"; 

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
            return true; 
        } 
        else { 
            this.router.navigate(['/pages/login']) 
            return false; 
        } 
    } 
}