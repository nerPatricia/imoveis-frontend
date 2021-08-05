import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalariosEndpointService } from 'src/app/service/salarios-endpoint.service';
import { IEmployee } from 'src/app/interfaces/corretores_model';
import { CorretoresEndpointService } from 'src/app/service/corretores-endpoint.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.less']
})
export class PagamentosComponent implements OnInit {
  meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  corretor: IEmployee;
  pagamento;
  listaCorretor = [];
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

  getSelectedCorretor(event){
    this.listaCorretor.forEach((corretor) => {
      if(event.value == corretor.creci){
        this.corretor = corretor;
        return;
      }
    });
  }

  preencheLista() {
    this.salariosService.getSalario(this.form.value).then(
      (response: any) => {
        this.pagamento = [{ corretor: this.corretor, salarioTotal: response.total || response.comissao }];
        console.log(this.pagamento);
      }, error => {
        console.log(error); 
      }
    )
  }
}
