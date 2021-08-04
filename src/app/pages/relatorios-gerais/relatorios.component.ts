import { RelatoriosEndpointService } from './../../service/relatorios-endpoint.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.less'],
})
export class RelatoriosComponent {
  relatorio = null;
  mes: string = "";
  ano: string = "";
  vendidosTog = false;
  encalhadosTog = false;

  constructor(
    public dialog: MatDialog,
    private relatoriosService: RelatoriosEndpointService
  ) {}

  pesquisar() {
    this.relatoriosService.getRelatorios({mes: this.mes, ano: this.ano}).then(
      (response: any) => {
        this.relatorio = response.relatorio;
      }, error => {
        console.log(error);
      }
    )
  }

  setVendidosTog() {
    this.vendidosTog = !this.vendidosTog;
  }

  setEncalhadosTog() {
    this.encalhadosTog = !this.encalhadosTog;
  }

  //<-- Methods -->
  // lucroCorre(corretor){
  //   var sal = 0;
  //   var fat = 0;
  //   var sum = 0;
  //   if(corretor.salario){
  //     sal = corretor.salario;
  //   }
  //   this.vendasMes.forEach(venda => {
  //     if(venda.corretor == corretor.creci){
  //       sum += venda.valorReal * (corretor.percentComissao/100.0);
  //       fat += venda.valorReal * 0.05
  //     }
  //   })
  //   return [sal, sum, fat];
  // }

  // pesquisar() {
  //   //PARA TESTE (substituir por chamada no back) ------
  //   this.vendasMes = [];
  //   var from = new Date(this.ano +"-" +this.mes +"-01");
  //   var to = new Date(this.ano +"-" +(parseInt(this.mes)+1) +"-01");
  //   this.vendas.forEach(venda => {
  //     if(venda.dataVenda > from && venda.dataVenda < to){
  //       this.vendasMes.push(venda);    
  //     }  
  //   })
  //   // -------------------------------------------------

  //   var p = [];
  //   this.pagamentosMes = [];
  //   this.corretores[0].forEach(corretor => {
  //     p = this.lucroCorre(corretor);
  //     this.pagamentosMes.push({nomeCorretor: corretor.nome, creci: corretor.creci, salario: p[0], pagamento: p[1], faturamento: p[2]})
  //   })
  // }

  //<-- Computed Properties -->
  // get totalFat() {
  //   return this.vendasMes.reduce((sum, current) => sum + (current.valorReal * 0.05), 0);
  // }

  // get totalPago(){
  //   return this.pagamentosMes.reduce((sum, current) => sum + current.pagamento, 0);
  // }

  // get funcionarioMes(){
  //   return this.pagamentosMes.reduce((a, e) => e.pagamento > a.pagamento ? e : a);
  // }

}
