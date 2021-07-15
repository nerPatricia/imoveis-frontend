import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table'  //necessário?
import { Employee } from 'src/app/interfaces/corretores_model';
import { CORRETORES_CM, CORRETORES_CT } from '../../interfaces/corretores_mock';
import { EditarCorretorDialogComponent } from 'src/app/components/editar-corretor/editar-corretor.component';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corretores',
  templateUrl: './corretores.component.html',
  styleUrls: ['./corretores.component.less']
})
export class CorretoresComponent implements OnInit {
  corretores_ct: Employee[] = CORRETORES_CT;  //corretores é do tipo Employee (interface) que será um array que armazena os fake employee
  corretores_cm: Employee[] = CORRETORES_CM;  //corretores é do tipo Employee (interface) que será um array que armazena os fake employee
  corretores = [this.corretores_ct, this.corretores_cm];
  form: FormGroup;
  totalChecked = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    //console.log(this.corretores_cm);
    console.log(this.corretores);
  }

  corretorModal(corretor?) {
    console.log(corretor);
    this.dialog.open(EditarCorretorDialogComponent, {
      data: {
        corretor: corretor || null
      },
      width: '700px',
      backdropClass: 'modal-menor'
    });
  }

  deletarCorretor(corretor) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja mesmo remover este corretor?',
      confirmButtonText: 'Remover',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: acessar o endpoint de remover corretor aqui 
        // tem o objeto do corretor selecionado no parametro pra pegar as informações
        // se precisar dar um reload na tela depois, usar window.location.reload()
        Swal.fire('Removido com sucesso', '', 'success');
      }
    })
  }
}
