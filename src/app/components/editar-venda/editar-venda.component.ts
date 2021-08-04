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
    console.log(data);

    this.form = this.fb.group({
      codigoImovel: new FormControl(data.venda?.codigoImovel || '', [Validators.required]),
      valor: new FormControl(data.venda?.valor || '', [Validators.required]),
      nomeComprador: new FormControl(data.venda?.nomeComprador || '', [Validators.required]),
      creciCorretor: new FormControl(data.venda?.creciCorretor || '', [Validators.required]),
      dataVenda: new FormControl(data.venda?.dataVenda || '', [Validators.required])
    });
    if (this.data.venda) {
      this.form.get('codigoImovel').disable();
    }
    this.titulo = data.venda  ? "EDITAR VENDA" : "CADASTRAR VENDAS";
  }

  getErrorMessage(field) {
    if (this.form.get(field)) {
      return this.form.get(field).hasError('required')
        ? 'Campo requerido'
        : '';
    }
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }

  atualizar() {
    this.formataForm();

    if(this.data.venda){
      this.vendasService
        .updateVendaById(this.form.value, this.data.venda._id)
        .then(
          (response) => {
            Swal.fire('Imovel atualizado com sucesso', '', 'success').then(() =>
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
          console.log(response);
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
      this.form
        .get('dataDeCadastro')
        .setValue(
          ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2)
        );
    }
  }
}
