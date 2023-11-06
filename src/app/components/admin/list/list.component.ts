import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; 
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit { 
  
  //mome das colunas do grid (DataTable) no material 
  colunas: string[] = ['data', 'valor', 'tipo', 'categoria', 'nome', 'operacoes']; 
  
  //dados preenchidos na tabela 
  dataTable = new MatTableDataSource<DataSourceModel>();
  
  constructor( 
    private spinnerService: NgxSpinnerService 
  ){} 
  
  ngOnInit(): void { 
    this.spinnerService.show(); 
    
    const dados: any[] = []; 
    
    dados.push({ 
      nome : 'Fatura de cartão de crédito', 
      data: '25/10/23', 
      valor: 2000, 
      tipo: 'Conta a pagar', 
      categoria: 'Cartoes' 
    }); 
    
    dados.push({ 
      nome : 'Conta de Telefone', 
      data: '26/10/23', 
      valor: 150, 
      tipo: 'Conta a pagar', 
      categoria: 'Despesas fixas' 
    }); 
    
    this.dataTable.data = dados; 
    
    this.spinnerService.hide(); 
  }

}

/* Modelo de dados do DataTable */ 
class DataSourceModel { 
  nome: string = ''; 
  data: string = ''; 
  valor: string = ''; 
  tipo: string = ''; 
  categoria: string = ''; 
}