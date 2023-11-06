import { CategoriasResponse } from './categorias-response.model'; 

/* 
    modelo de dados para a consulta 
    de contas nos serviços da api 
*/ 

export class ContasResponse { 
    id: string = ''; 
    nome: string = ''; 
    data: Date | null = null; 
    valor: number = 0; 
    descricao: string = ''; 
    tipo: number = 0; 
    categoria: CategoriasResponse | null = null; 
}