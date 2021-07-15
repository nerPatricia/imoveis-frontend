import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-corretor',
  templateUrl: './editar-corretor.component.html',
  styleUrls: ['./editar-corretor.component.less']
})
export class EditarCorretorDialogComponent implements OnInit {
  form: FormGroup;
  formSelect: FormGroup;
  tipoCorretor = ['Contratado', 'Comissionado'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCorretorDialogComponent>,
    private fb: FormBuilder,
  ) { 
    console.log(data);
    
    this.form = this.fb.group({
      creci: new FormControl(data.corretor?.creci || '', [Validators.required]),
      nome: new FormControl(data.corretor?.nome || '', [Validators.required]),
      salario: new FormControl(data.corretor?.salario || '', [Validators.required]),
      dataAdmissao: new FormControl(data.corretor?.dataAdmissao || '', [Validators.required]),
      percentComissao: new FormControl(data.corretor?.percentComissao || '', [Validators.required])
    });
    //console.log(this.form);

    this.formSelect = new FormGroup({
      tipo: new FormControl(this.tipoCorretor[0]),
    });
    //console.log(this.formSelect);
  }
  
  getTypesSearch(event) {
    // TODO: quando seleciona o tipo, exibir apenas imoveis do tipo selecionado
    console.log("selecionou um tipo de imovel: ", event.value);
    if(event.value === 'contratado') {
      console.log('1');
    }
    else {
      console.log('1111');
    }
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }
}
