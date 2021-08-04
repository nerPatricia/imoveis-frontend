import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IPagamentoEmployee } from 'src/app/interfaces/pagamentos_model';
import { pagamentosList } from 'src/app/interfaces/pagamentos_mock';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.less']
})
export class PagamentosComponent implements OnInit, AfterViewInit {
  pagamentosCorretores: IPagamentoEmployee[] = pagamentosList;
  @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;
  listaCorretor: Array<any> = []; //array utilizado para popular as opções do select de corretor

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.listaCorretor);
    //console.log(this.pagamentosCorretores);
  }

  getTypesSearch(event) {
    // TODO: quando seleciona o tipo, exibir apenas imoveis do tipo selecionado
    console.log("Selecionou um corretor: ", event);
  }
}
