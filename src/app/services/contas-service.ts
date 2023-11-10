import { Observable } from 'rxjs';
import { CategoriasResponse } from '../models/contas/categorias-response.model';
import { environment } from 'src/environments/environment.development';
import { createRequest } from './commons.service';
import { ContasResponse } from '../models/contas/contas-response.model';
import { ContasRequest } from '../models/contas/contas-request.model';
import axios from "axios";
import { getUserLogin, isUserAuthenticated } from '../helpers/authentication.helper';

//função para acessar o serviço de consulta de categorias
export function getCategorias(): Observable<CategoriasResponse[]> {
    const config = {
        method: 'get',
        url: `${environment.apiFinancas}/categorias`
    };

    return createRequest<CategoriasResponse[]>(config);
}

//função para cadastrar conta
export function postContas(request: ContasRequest): Observable<ContasResponse> {
    const config = {
        method: 'post',
        url: `${environment.apiFinancas}/contas`,
        data: request
    }

    return createRequest<ContasResponse>(config);
}

//função para atualizar conta
export function putContas(request: ContasRequest): Observable<ContasResponse> {
    const config = {
        method: 'put',
        url: `${environment.apiFinancas}/contas`,
        data: request
    }

    return createRequest<ContasResponse>(config);
}

//função para excluir conta
export function deleteContas(id: string): Observable<ContasResponse> {
    const config = {
        method: 'delete',
        url: `${environment.apiFinancas}/contas/${id}`
    }

    return createRequest<ContasResponse>(config);
}

//função para consultar contas
export function getContas(dataMin : Date, dataMax: Date): Observable<ContasResponse[]> {
    const config = {
        method: 'get',
        url: `${environment.apiFinancas}/contas/${dataMin}/${dataMax}`
    }

    return createRequest<ContasResponse[]>(config);
}

//função para consultar 1 conta por id
export function getContaById(id: string): Observable<ContasResponse> {
    const config = {
        method: 'get',
        url: `${environment.apiFinancas}/contas/${id}`
    }

    return createRequest<ContasResponse>(config);
}

//interceptor para enviar o TOKEN para autenticação
axios.interceptors.request.use(
    config => {

        //verificando se a chamada é para a API de contas
        if(config.url?.includes(environment.apiFinancas)) {
            //verificando se o usuário está autenticado
            if(isUserAuthenticated()) {
                //capturando o token
                const accessToken = getUserLogin()?.accessToken;
                //enviando o TOKEN na requisição
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);