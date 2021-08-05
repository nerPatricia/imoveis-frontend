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
  faturamentoTog = false;
  valorTog = false;

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

  setFaturamentoTog() {
    this.faturamentoTog = !this.faturamentoTog;
  }

  setValorTog() {
    this.valorTog = !this.valorTog;
  }
}
