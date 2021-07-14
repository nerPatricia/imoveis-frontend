import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table'  //necessário?
import { Employee } from 'src/app/interfaces/corretores_model';
import { CORRETORES_CM, CORRETORES_CT } from '../../interfaces/corretores_mock';
import { EditarCorretorDialogComponent } from 'src/app/components/editar-corretor/editar-corretor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-corretores',
  templateUrl: './corretores.component.html',
  styleUrls: ['./corretores.component.less']
})
export class CorretoresComponent implements OnInit {
  corretores_ct: Employee[] = CORRETORES_CT;  //corretores é do tipo Employee (interface) que será um array que armazena os fake employee
  corretores_cm: Employee[] = CORRETORES_CM;  //corretores é do tipo Employee (interface) que será um array que armazena os fake employee

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //console.log(this.corretores_cm);
  }

  corretorModal(corretor?) {
    this.dialog.open(EditarCorretorDialogComponent, {
      data: {
        corretor: corretor || null
      },
      width: '700px',
      backdropClass: 'modal-menor'
    });
  }
}
