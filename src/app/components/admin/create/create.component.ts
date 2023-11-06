import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.createForm = this.formBuilder.group({ 
      nome: ['', Validators.required], 
      data: ['', Validators.required], 
      valor: ['', Validators.required], 
      tipo: ['', Validators.required], 
      categoria: ['', Validators.required], 
      descricao: ['', Validators.required], 
    });

  } 
  
  onSubmit(): void { 
    console.log(this.createForm.value); 
  }
}