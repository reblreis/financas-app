import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { deleteContas, getContas } from 'src/app/services/contas-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent { 
  
  //mome das colunas do grid (DataTable) no material 
  colunas: string[] = ['data', 'valor', 'tipo', 'categoria', 'nome', 'operacoes']; 
  
  //dados preenchidos na tabela 
  dataTable = new MatTableDataSource<DataSourceModel>();

  //formulário 
  listForm: FormGroup;

  //exibição de mensagem
  mensagem: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService
  
  ){ 
    this.listForm = this.formBuilder.group({ 
      dataMin: ['', Validators.required], 
      dataMax: ['', Validators.required] 
    }) 
  } 
  
  get form(): any { 
    return this.listForm.controls; 
  } 
  
  onSubmit(): void {
    this.spinnerService.show(); 
    
    const dataMin = this.listForm.value.dataMin as Date; 
    const dataMax = this.listForm.value.dataMax as Date; 
    
    getContas(dataMin, dataMax) 
      .subscribe({ 
        next: (data) => { 
        
        const model: DataSourceModel[] = []; 
        
        data.forEach(item => { 
          model.push({ 
            id: item.id, 
            nome: item.nome, 
            data: item.data as Date, 
            valor: item.valor, 
            categoria: item.categoria?.nome as string, 
            tipo: item.tipo 
          }); 
        }); 
        
        this.dataTable.data = model; 
      
      }, 
      error: (e) => { 
        console.log(e.error.response); 
      } 
    }) 
    .add(() => { 
      this.spinnerService.hide(); 
    })
  }
  
  onDelete(id : string): void { 
    if(window.confirm('Deseja realmente excluir a conta selecionada?')) { 
      this.spinnerService.show(); 
        deleteContas(id) 
          .subscribe({ 
            next: (data) => { 
              this.mensagem = `Conta '${data.nome}', excluída com sucesso.`; 
              this.onSubmit(); 
            }, 
            error: (e) => { 
              console.log(e.response); 
            } 
          })
          .add(() => { 
            this.spinnerService.hide(); 
          }) 
      } 
    } 
}

/* Modelo de dados do DataTable */ 
class DataSourceModel {
  id: string = ''; 
  nome: string = ''; 
  data: Date = new Date(); 
  valor: number = 0; 
  tipo: number = 0; 
  categoria: string = ''; 
}