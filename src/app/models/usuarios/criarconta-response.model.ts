/* 
    Modelo de dados para a resposta: 
    POST /api/usuarios/criarconta 
*/ 
export class CriarContaResponse { 
    id: string = ''; 
    nome: string = ''; 
    email: string = ''; 
    dataHoraCadastro: Date | null = null; 
}