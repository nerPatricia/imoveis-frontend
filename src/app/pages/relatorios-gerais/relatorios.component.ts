import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IVenda } from 'src/app/interfaces/vendas_model';
import { IPagamento } from 'src/app/interfaces/pagamentos_model';
import { CORRETORES_CM, CORRETORES_CT, LISTAVENDAS } from '../../interfaces/relatorios_mock';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.less'],
})
export class RelatoriosComponent implements OnInit {
  vendas: IVenda[] = LISTAVENDAS //<- apenas para testes
  corretores = [CORRETORES_CM, CORRETORES_CT]
  
  vendasMes: IVenda[] = [];
  pagamentosMes: IPagamento[] = [];
  
  mes: string = "";
  ano: string = "";

  constructor(public dialog: MatDialog){}

  //<-- Methods -->
  lucroCorre(corretor){
    var sal = 0;
    var fat = 0;
    var sum = 0;
    if(corretor.salario){
      sal = corretor.salario;
    }
    this.vendasMes.forEach(venda => {
      if(venda.corretor == corretor.creci){
        sum += venda.valorReal * (corretor.percentComissao/100.0);
        fat += venda.valorReal * 0.05
      }
    })
    return [sal, sum, fat];
  }

  chageMonth() {
    //PARA TESTE (substituir por chamada no back) ------
    this.vendasMes = [];
    var from = new Date(this.ano +"-" +this.mes +"-01");
    var to = new Date(this.ano +"-" +(parseInt(this.mes)+1) +"-01");
    this.vendas.forEach(venda => {
      if(venda.dataVenda > from && venda.dataVenda < to){
        this.vendasMes.push(venda);    
      }  
    })
    // -------------------------------------------------

    var p = [];
    this.pagamentosMes = [];
    this.corretores[0].forEach(corretor => {
      p = this.lucroCorre(corretor);
      this.pagamentosMes.push({nomeCorretor: corretor.nome, creci: corretor.creci, salario: p[0], pagamento: p[1], faturamento: p[2]})
    })
  }

  ngOnInit() {}

  //<-- Computed Properties -->
  get totalFat() {
    return this.vendasMes.reduce((sum, current) => sum + (current.valorReal * 0.05), 0);
  }

  get totalPago(){
    return this.pagamentosMes.reduce((sum, current) => sum + current.pagamento, 0);
  }

  get funcionarioMes(){
    return this.pagamentosMes.reduce((a, e) => e.pagamento > a.pagamento ? e : a);
  }

}
