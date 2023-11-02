/* 
    Modelo de dados para a requisição: 
    POST /api/usuarios/criarconta 
*/ 
export class CriarContaRequest { 
    constructor( 
        public nome: string, 
        public email: string, 
        public senha: string 
    ) {} 
}