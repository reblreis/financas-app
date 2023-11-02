import { CriarContaRequest } from "../models/usuarios/criarconta-request.model"; 
import { Observable } from 'rxjs'; 
import { CriarContaResponse } from "../models/usuarios/criarconta-response.model"; 
import { environment } from "src/environments/environment.development"; 
import { createRequest } from "./commons.service"; 
import { AutenticarRequest } from "../models/usuarios/autenticar-request.model"; 
import { AutenticarResponse } from "../models/usuarios/autenticar-response.model"; 

/* 
    Função para executar o serviço 
    POST /api/usuarios/criarconta 
*/ 
export function criarConta(request: CriarContaRequest) 
    : Observable<CriarContaResponse> { 
        
        //configurando a requisição 
        const config = { 
            method: 'post', 
            url: `${environment.apiUsuarios}/criarconta`, 
            data: request 
        }; 
        
        return createRequest<CriarContaResponse>(config); 
    } 
        
/* 
    Função para executar o serviço 
    POST /api/usuarios/autenticar 
*/ 
export function autenticar(request: AutenticarRequest) 
    : Observable<AutenticarResponse> { 
        
        //configurando a requisição 
        const config = { 
            method: 'post', 
            url: `${environment.apiUsuarios}/autenticar`, 
            data: request 
        }; 
        
        return createRequest<AutenticarResponse>(config); 
    }