import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { CategoriasResponse } from 'src/app/models/contas/categorias-response.model'; 
import { getCategorias, getContaById } from 'src/app/services/contas-service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup; 
  categorias: CategoriasResponse[] = []; 
  mensagem: string = ''; 
  
  constructor( 
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private spinnerService: NgxSpinnerService 
  ) { 
    this.editForm = this.formBuilder.group({ 
      id: ['', Validators.required], 
      nome: ['', Validators.required], 
      data: ['', Validators.required], 
      valor: ['', Validators.required], 
      tipo: ['', Validators.required], 
      categoria: ['', Validators.required], 
      descricao: ['', Validators.required], 
    }); 
  } 
  
  get form(): any { 
    return this.editForm.controls; 
  }

  ngOnInit(): void { 
    this.spinnerService.show(); 
    getCategorias() 
      .subscribe({ 
        next: (data) => { 
          this.categorias = data; 
        }, error: (e) => { 
          console.log(e.response); 
        },
      }) 
      .add(() => { 
        this.spinnerService.hide(); 
      }); 
      
      this.spinnerService.show(); 
      const id = this.activatedRoute.snapshot.paramMap.get('id') as string; 
      getContaById(id) 
        .subscribe({ 
          next: (data) => { 
            //preenchendo o formulário 
            this.editForm.patchValue(data); 
          }, 
          error: (e) => { 
            console.log(e.error); 
          }, 
        }) 
        .add(() => { 
          this.spinnerService.hide(); 
        }); 
      } 
      
      onSubmit(): void { 
        console.log(this.editForm.value); 
      }

}
