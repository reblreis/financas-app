import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CriarContaRequest } from 'src/app/models/usuarios/criarconta-request.model'; 
import { criarConta } from 'src/app/services/usuarios-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  resposta: string = '';

  constructor( 
    private spinnerService: NgxSpinnerService 
  ){ }

  formRegister = new FormGroup({

    nome: new FormControl('', [ 
      Validators.required, 
      Validators.minLength(8), 
      Validators.maxLength(100) 
    ]), 

    email: new FormControl('', [ 
      Validators.required, 
      Validators.email 
    ]), 

    senha: new FormControl('', [ 
      Validators.required, 
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) 
    ]) 
  }); 
  
  get form(): any { 
    return this.formRegister.controls; 
  } 
  
  onSubmit(): void { 
    this.spinnerService.show();
    
    //parâmetros da requisição 
    const request = new CriarContaRequest( 
      this.formRegister.value.nome as string, 
      this.formRegister.value.email as string, 
      this.formRegister.value.senha as string 
    ); 
      
    criarConta(request) 
      .subscribe({ 
        next: (resp) => { 
          this.resposta = `Parabéns ${resp.nome}, sua conta 
                                                  de usuário foi criada com sucesso`; 
          this.formRegister.reset(); 
        }, 
        error: (e) => { 
          this.resposta = e.response.data.message; 
        } 
      }).add(() => { 
        this.spinnerService.hide(); 
      })
  }
}