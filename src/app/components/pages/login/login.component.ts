import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( 
    private spinnerService: NgxSpinnerService 
    ){ } 
    
    formLogin = new FormGroup({ 
      email: new FormControl('', [ 
        Validators.required, 
        Validators.email 
      ]), 
      senha: new FormControl('', [ 
        Validators.required, 
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d) (?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) 
      ]) 
    }); 
    
    get form(): any { 
      return this.formLogin.controls; 
    } 
    
    onSubmit(): void { 
      this.spinnerService.show(); 
    }
}