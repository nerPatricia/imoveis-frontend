import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-corretor',
  templateUrl: './editar-corretor.component.html',
  styleUrls: ['./editar-corretor.component.less']
})
export class EditarCorretorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCorretorDialogComponent>,
    private fb: FormBuilder,
  ) { 
    console.log(data);
  }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }
}
