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
    
    this.form = this.fb.group({
      creci: new FormControl(data.corretor?.creci || '', [Validators.required]),
      nome: new FormControl(data.corretor?.nome || '', [Validators.required]),
      salario: new FormControl(data.corretor?.salario || '', [Validators.required]),
      dataAdmissao: new FormControl(data.corretor?.dataAdmissao || '', [Validators.required]),
      comissao: new FormControl(data.corretor?.comissao || '', [Validators.required]),
      tipo: new FormControl(data.corretor?.tipo || 'Contratado', [Validators.required])
    });
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
    console.log(this.form.value);

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
