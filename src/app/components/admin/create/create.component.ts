import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { CategoriasResponse } from 'src/app/models/contas/categorias-response.model';
import { ContasRequest } from 'src/app/models/contas/contas-request.model'; 
import { getCategorias, postContas } from 'src/app/services/contas-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  categorias: CategoriasResponse[] = [];
  mensagem: string = '';

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

  get form(): any { 
    return this.createForm.controls; 
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
    this.spinnerService.show(); 
    
    //capturar os campos do formulário 
    const request = new ContasRequest( 
      '', 
      this.createForm.value.nome as string,
      this.createForm.value.data as Date, 
      this.createForm.value.valor as number, 
      this.createForm.value.descricao as string, 
      this.createForm.value.tipo as number,
      this.createForm.value.categoria as string 
    ); 
    
    //realizando o cadastro 
    postContas(request) 
      .subscribe({ 
        next: (data) => { 
          this.mensagem = `Conta '${data.nome}', 
                            cadastrada com sucesso.`; 
          this.createForm.reset(); 
        }, 
        error: (e) => { 
          this.mensagem = `Erro: ${e.response}`; 
        }, 
      }) 
      .add(() => { 
        this.spinnerService.hide(); 
      }); 
  } 
}