import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IPagamentoEmployee } from 'src/app/interfaces/pagamentos_model';
import { SalariosEndpointService } from 'src/app/service/salarios-endpoint.service';
import { IEmployee } from 'src/app/interfaces/corretores_model';
import { CorretoresEndpointService } from 'src/app/service/corretores-endpoint.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.less']
})
export class PagamentosComponent implements OnInit, AfterViewInit {
  meses = ["janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  corretor: IEmployee;
  pagamento = [];
  listaCorretor = []; //array utilizado para popular as opções do select de corretor
  form: FormGroup;

  constructor(
    private salariosService: SalariosEndpointService,
    private corretoresService: CorretoresEndpointService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      creciCorretor: ['', Validators.required],
      mes: ['', Validators.required],
      ano: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.corretoresService.getAllCorretoresByType('todos').then(
      (response: any) => {
        this.listaCorretor = response.corretores;
      }, error => {
        console.log(error);
      }
    )
  }

  ngAfterViewInit() {
    console.log(this.listaCorretor);
    //console.log(this.pagamentosCorretores);
  }

  getTypesSearch(event) {
    // TODO: quando seleciona o tipo, exibir apenas imoveis do tipo selecionado
    console.log("Selecionou um corretor: ", event);
  }

  getSelectedCorretor(event){
    this.listaCorretor.forEach((corretor) => {
      if(event.value == corretor.creci){
        this.corretor = corretor;
        return;
      }
    });
  }

  preencheLista() {
    console.log(this.form.value)
    this.salariosService.getSalario(this.form.value).then(
      (response: any) => {
        this.pagamento.push({salario: response, corretor: this.corretor});
        console.log(this.pagamento)
      }, error => {
        console.log(error); 
      }
    )
  }
}
