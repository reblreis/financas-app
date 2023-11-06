import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { CategoriasResponse } from 'src/app/models/contas/categorias-response.model'; 
import { getCategorias } from 'src/app/services/contas-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  categorias: CategoriasResponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService
    ) { 
    this.createForm = this.formBuilder.group({ 
      nome: ['', Validators.required], 
      data: ['', Validators.required], 
      valor: ['', Validators.required], 
      tipo: ['', Validators.required], 
      categoria: ['', Validators.required], 
      descricao: ['', Validators.required], 
    });

  }
  
  ngOnInit(): void { 
    
    this.spinnerService.show(); 
    
    getCategorias() 
      .subscribe({ 
        next: (data) => { 
          this.categorias = data; 
        }, 
        error: (e) => { 
          console.log(e.response); 
        } 
      }) 
      .add(() => { 
        this.spinnerService.hide(); 
      }) 
  }
  
  onSubmit(): void { 
    console.log(this.createForm.value); 
  }
}