import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IVenda } from 'src/app/interfaces/vendas_model';
import { vendasList } from '../../interfaces/vendas_mock';
import { EditarVendaDialogComponent } from 'src/app/components/editar-venda/editar-venda.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.less']
})

export class VendasComponent implements OnInit, AfterViewInit{
  vendas = new MatTableDataSource<IVenda>(vendasList);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog){}

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

  deletarVendas(venda) { //ALTERAR PARA VENDAS
    Swal.fire({
      icon: 'warning',
      title: 'Deseja mesmo remover esta venda?',
      confirmButtonText: 'Remover',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: acessar o endpoint de remover corretor aqui 
        // tem o objeto do corretor selecionado no parametro pra pegar as informações
        // se precisar dar um reload na tela depois, usar window.location.reload()
        Swal.fire('Removido com sucesso', '', 'success');
      }
    })
  }
}
