/* 
    Modelo de dados para a resposta: 
    POST /api/usuarios/autenticar
*/
export class AutenticarResponse { 
    id: string = '';
    nome: string = ''; 
    email: string = '';
    accessToken: string = '';
    perfil: string = '';
    dataHoraAcesso: Date | null = null;
    dataHoraExpiracao: Date | null = null;    
}