import * as CryptoJS from 'crypto-js'; 
import { environment } from 'src/environments/environment.development'; 

/* 
    Função para realizar a criptografia de um valor 
*/ 
export function encrypt(data: string): string { 
    return CryptoJS.AES.encrypt(data, 
        environment.chaveCriptografia).toString(); 
} 

/* 
    Função para descriptografar um valor 
*/ 
export function decrypt(data: string): string { 
    return CryptoJS.AES.decrypt(data, 
        environment.chaveCriptografia).toString( 
            CryptoJS.enc.Utf8 
        ); 
}