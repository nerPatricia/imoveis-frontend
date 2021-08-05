import Swal from 'sweetalert2';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CorretoresEndpointService } from 'src/app/service/corretores-endpoint.service';

@Component({
  selector: 'app-editar-corretor',
  templateUrl: './editar-corretor.component.html',
  styleUrls: ['./editar-corretor.component.less']
})
export class EditarCorretorDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private corretoresService: CorretoresEndpointService,
    public dialogRef: MatDialogRef<EditarCorretorDialogComponent>,
    private fb: FormBuilder,
  ) { 
    console.log(data);

    if (this.data.corretor) {
      const date = new Date(this.data.corretor.dataAdmissao);
      const ano = date.getUTCFullYear();
      const mes = date.getUTCMonth() + 1;
      const dia = date.getUTCDate();
      this.data.corretor.dataAdmissao = (dia < 10 ? '0'+dia : dia) + '/' + (mes < 10 ? '0'+mes : mes) + '/' + ano;
    }
    
    this.form = this.fb.group({
      creci: new FormControl(data.corretor?.creci || '', [Validators.required]),
      nome: new FormControl(data.corretor?.nome || '', [Validators.required]),
      salario: new FormControl(data.corretor?.salario || '', [Validators.required]),
      dataAdmissao: new FormControl(data.corretor?.dataAdmissao || '', [Validators.required]),
      comissao: new FormControl(data.corretor?.comissao || '', [Validators.required]),
      tipo: new FormControl(data.corretor?.tipo || 'Contratado', [Validators.required])
    });
    if (this.data.corretor) {
      this.form.get('tipo').disable();
      this.form.get('creci').disable();
    }
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }

  cadastrar() {
    console.log(this.form.value);
  }

  atualizar() {
    this.formataForm();

    if(this.data.corretor){
      this.corretoresService
        .updateCorretorById(this.form.value, this.data.corretor._id)
        .then(
          (response) => {
            Swal.fire('Corretor atualizado com sucesso', '', 'success').then(() =>
              window.location.reload()
            );
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
    this.corretoresService.addCorretor(this.form.value).then(
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
    if (this.form.get('dataAdmissao').value.includes('/')) {
      // se a data incluir uma / quer dizer q nao ta no formato date, entao tem q formatar
      const dia = this.form.get('dataAdmissao').value.split('/')[0];
      const mes = this.form.get('dataAdmissao').value.split('/')[1];
      const ano = this.form.get('dataAdmissao').value.split('/')[2];
      console.log(dia);
      this.form
        .get('dataAdmissao')
        .setValue(
          new Date(ano +'-' +mes +'-' +dia)
        );
    }
  }
}
