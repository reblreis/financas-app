import { Component, OnInit } from '@angular/core'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
  graficoDonnut: Chart = new Chart(); 
  graficoColunas: Chart = new Chart(); 
  
  constructor(private spinnerService: NgxSpinnerService) {} 
  
  ngOnInit(): void { 
    this.spinnerService.show(); 
    this.criarGraficoDonnut(); 
    this.criarGraficoColunas(); 
    this.spinnerService.hide(); 
  } 
  
  criarGraficoDonnut(): void { 
    var dados = [ 
      ['Contas a pagar', 4000], 
      ['Contas a receber', 5000], 
    ]; 
    
    this.graficoDonnut = new Chart({ 
      chart: { type: 'pie' }, 
      title: { text: 'Contas a Pagar X Contas a Receber do mês de Outubro/2023', 
    }, 
    subtitle: { text: 'Somatório de contas a pagar ou receber do mês atual' }, 
    plotOptions: { 
      pie: { innerSize: '50%', depth: 45 }, 
    }, 
    series: [{ data: dados, type: undefined as any }], 
    credits: { enabled: false }, 
    }); 
  }
  
  criarGraficoColunas(): void {
    var dados = [ 
      ['Alimentação', 1000], 
      ['Saúde', 1500], 
      ['Casa', 3000], 
      ['Lazer', 1200], 
    ]; 
    var nomes = [ 
      'Contas de alimentação', 
      'Despesas de Saúde', 
      'Despesas de Casa', 
      'Lazer', 
    ]; 
    
    this.graficoColunas = new Chart({ 
      chart: { type: 'column' }, 
      title: { text: 'Total de Contas por Categoria do mês de Outubro/2023' 
      }, 
      subtitle: { text: 'Somatório de contas a pagar ou receber por categoria', 
      }, 
      series: [{ data: dados, type: undefined as any }], 
      xAxis: { categories: nomes }, 
      credits: { enabled: false }, 
    }); 
  } 
}