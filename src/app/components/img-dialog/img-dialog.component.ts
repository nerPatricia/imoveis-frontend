import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-img-dialog-component',
  templateUrl: 'img-dialog.component.html',
  styleUrls: ['img-dialog.component.less']
})
export class ImgDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImgDialogComponent>,
  ) {}

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }
}
