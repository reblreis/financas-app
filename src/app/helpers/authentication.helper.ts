import { environment } from 'src/environments/environment.development'; 
import { AutenticarResponse } from '../models/usuarios/autenticar-response.model'; 
import { decrypt, encrypt } from './crypto.helper';

/* 
    função para gravar os dados do usuário autenticado 
    na local storage do navegador 
*/ 
export function createLogin(data: AutenticarResponse): void { 
    localStorage.setItem( 
        environment.chaveAutenticacao, 
        encrypt(JSON.stringify(data)) 
    ); 
}

/* 
    função para ler os dados do usuário autenticado 
    que foram gravados na local storage 
*/ 
export function getUserLogin(): AutenticarResponse | null { 
    const data = localStorage.getItem(environment.chaveAutenticacao) as string | null; 
    if(data != null) { 
        const result = decrypt(data); 
        if(result != null) { 
            return JSON.parse(result) as AutenticarResponse; 
        } 
    } 
    return null; 
}

/* 
    função para verificar se os dados gravados na local storage 
    do usuário autenticado são válidos 
*/ 
export function isUserAuthenticated(): boolean {    
    const result = getUserLogin();    
    if(result != null) { 
        const dataAtual = new Date(); 
        const dataExpiracao = new Date(result.dataHoraExpiracao as Date); 
        return dataAtual <= dataExpiracao; 
    } 
    
    return false; 
} 

/* 
    função para logout do usuário 
*/ 
export function logout(): void {    
    localStorage.removeItem(environment.chaveAutenticacao); 
}