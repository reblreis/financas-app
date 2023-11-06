import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { createLogin } from 'src/app/helpers/authentication.helper';
import { AutenticarRequest } from 'src/app/models/usuarios/autenticar-request.model';
import { autenticar } from 'src/app/services/usuarios-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  resposta: string = '';

  constructor(
    private spinnerService: NgxSpinnerService,
    private router: Router
  ){ }

  formLogin = new FormGroup({
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
    return this.formLogin.controls;
  }

  onSubmit(): void {
    this.spinnerService.show();

    const request = new AutenticarRequest(
      this.formLogin.value.email as string,
      this.formLogin.value.senha as string
    );

    autenticar(request)
      .subscribe({
        next: (data) => {
          createLogin(data); //autenticando o usuário
          //redirecionamento
          this.router.navigate(['/admin/dashboard'])
            .then(() => {
              window.location.reload();
            });
        },
        error: (e) => {
          this.resposta = e.response.data.message;
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }

}