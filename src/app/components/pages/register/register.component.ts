import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]) [A-Za-z\d@$!%*?&]{8,}$/) 
    ]) 
  }); 
  
  get form(): any { 
    return this.formRegister.controls; 
  } 
  
  onSubmit(): void { 
    this.spinnerService.show(); 
  }
}