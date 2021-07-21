import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-venda',
  templateUrl: './editar-venda.component.html',
  styleUrls: ['./editar-venda.component.less']
})
export class EditarVendaDialogComponent implements OnInit {
  titulo = "";
  edit = false;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarVendaDialogComponent>,
    private fb: FormBuilder,
  ) { 
    console.log(data);

    this.form = this.fb.group({
        codImovel: new FormControl(data.venda?.codImovel || '', [Validators.required]),
        valorReal: new FormControl(data.venda?.valorReal || '', [Validators.required]),
        nomeComprador: new FormControl(data.venda?.nomeComprador || '', [Validators.required]),
        nomeCorretor: new FormControl(data.venda?.nomeCorretor || '', [Validators.required]),
        dataVenda: new FormControl(data.venda?.dataVenda || '', [Validators.required])
    });
    this.titulo = data.venda  ? "EDITAR VENDA" : "CADASTRAR VENDAS";
    this.edit = data.venda  ? true : false;
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

  cadastrar() {
    console.log(this.form.value);
  }
}
