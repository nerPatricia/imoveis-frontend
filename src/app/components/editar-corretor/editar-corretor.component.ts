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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCorretorDialogComponent>,
    private fb: FormBuilder,
  ) { 
    console.log(data);
    this.form = this.fb.group({
      creci: new FormControl(data.corretor?.creci || '', [Validators.required]),
      nomeCorretor: new FormControl(data.corretor?.nomeCorretor || '', [Validators.required]),
      salario: new FormControl(data.corretor?.salario || '', [Validators.required]),
      dataAdmissao: new FormControl(data.corretor?.dataAdmissao || '', [Validators.required]),
      percentComissao: new FormControl(data.corretor?.percentComissao || '', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }
}
