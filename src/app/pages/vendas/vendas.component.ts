import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IVenda } from 'src/app/interfaces/vendas_model';
import { VendasEndpointService } from 'src/app/service/vendas-endpoint.service';
import { EditarVendaDialogComponent } from 'src/app/components/editar-venda/editar-venda.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.less']
})

export class VendasComponent implements OnInit, AfterViewInit{
  vendas = new MatTableDataSource<IVenda>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private vendasService: VendasEndpointService,
    public dialog: MatDialog
  ){
    this.preencheLista();
  }

  ngOnInit(): void {
    console.log(this.vendas);
  }

  ngAfterViewInit() {
    this.vendas.paginator = this.paginator;
  }

  vendaModal(venda?) {
    console.log(venda);
    this.dialog.open(EditarVendaDialogComponent, {
      data: {
        venda: venda || null
      },
      width: '700px',
      backdropClass: 'modal-menor'
    });
  }

  preencheLista() {
    this.vendasService.getAllVendas().then(
      (response: any) => {
        this.vendas = response.vendas;
      }, error => {
        console.log(error); 
      }
    )
  }
}
