/* 
    modelo de dados para envio de contas para a API (POST ou PUT) 
*/ 

export class ContasRequest { 
    constructor( 
        public id: string, 
        public nome: string, 
        public data: Date, 
        public valor: number, 
        public descricao: string, 
        public tipo: number, 
        public categoriaId: string 
    ) {} 
}