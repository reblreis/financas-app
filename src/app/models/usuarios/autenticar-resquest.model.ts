/* 
    Modelo de dados para a requisição: 
    POST /api/usuarios/autenticar
*/
export class AutenticarRequest { 
    constructor( 
        public email: string, 
        public senha: string 
    ) {} 
}