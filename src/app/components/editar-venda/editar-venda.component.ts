import Swal from 'sweetalert2';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VendasEndpointService } from 'src/app/service/vendas-endpoint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-venda',
  templateUrl: './editar-venda.component.html',
  styleUrls: ['./editar-venda.component.less']
})
export class EditarVendaDialogComponent implements OnInit {
  titulo = "";
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vendasService: VendasEndpointService,
    public dialogRef: MatDialogRef<EditarVendaDialogComponent>,
    private fb: FormBuilder,
  ) { 
    if (this.data.venda) {
      const obj = this.montaData(this.data.venda.dataVenda);
      this.data.venda.dataVenda = (obj.mes < 10 ? '0'+obj.mes : obj.mes) + '/' + (obj.dia < 10 ? '0'+obj.dia : obj.dia) + '/' + obj.ano;
    }

    this.form = this.fb.group({
      codigoImovel: new FormControl(data.venda?.codigoImovel || '', [Validators.required]),
      valor: new FormControl(data.venda?.valor || '', [Validators.required]),
      nomeComprador: new FormControl(data.venda?.nomeComprador || '', [Validators.required]),
      creciCorretor: new FormControl(data.venda?.creciCorretor || '', [Validators.required]),
      dataVenda: new FormControl(data.venda?.dataVenda || '', [Validators.required])
    });

    const obj = this.montaData(this.form.get('dataVenda').value);
    this.form.get('dataVenda').setValue('/' + (obj.dia < 10 ? '0'+obj.dia : obj.dia) + '/' + (obj.mes < 10 ? '0'+obj.mes : obj.mes) + '/' + obj.ano);

    if (this.data.venda) {
      this.form.get('codigoImovel').disable();
    }
    this.titulo = data.venda  ? "EDITAR VENDA" : "CADASTRAR VENDAS";
  }

  montaData(dataOriginal) {
    const date = new Date(dataOriginal);
    const ano = date.getUTCFullYear();
    const mes = date.getUTCMonth() + 1;
    const dia = date.getUTCDate();
    return {ano, mes, dia};
  }

  getErrorMessage(field) {
    if (this.form.get(field)) {
      return this.form.get(field).hasError('required')
        ? 'Campo requerido'
        : '';
    }
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }

  atualizar() {
    this.formataForm();

    if (this.data.venda) {
      this.vendasService
        .updateVendaById(this.form.value, this.data.venda._id)
        .then(
          (response) => {
            Swal.fire('Venda atualizada com sucesso', '', 'success').then(() =>
              window.location.reload()
            );
          },
          (error) => {
            console.log(error);
          }
        );
    } else {  
      this.vendasService.addVenda(this.form.value).then(
        (response) => {
          Swal.fire('Venda cadastrada com sucesso', '', 'success').then(() =>
              window.location.reload()
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  formataForm() {
    if (this.form.get('dataVenda').value.includes('/')) {
      // se a data incluir uma / quer dizer q nao ta no formato date, entao tem q formatar
      const dia = this.form.get('dataVenda').value.split('/')[0];
      const mes = this.form.get('dataVenda').value.split('/')[1];
      const ano = this.form.get('dataVenda').value.split('/')[2];
      this.form.get('dataVenda').setValue(
        new Date(ano +'-' +mes +'-' +dia)
      );
    }
  }
}
