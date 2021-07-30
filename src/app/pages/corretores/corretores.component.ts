import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee } from 'src/app/interfaces/corretores_model';
import { CORRETORES_CM, CORRETORES_CT } from '../../interfaces/corretores_mock';
import { EditarCorretorDialogComponent } from 'src/app/components/editar-corretor/editar-corretor.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-corretores',
  templateUrl: './corretores.component.html',
  styleUrls: ['./corretores.component.less']
})
export class CorretoresComponent implements OnInit, AfterViewInit {
  corretores_ct = new MatTableDataSource<IEmployee>(CORRETORES_CT);  //corretores é do tipo Employee (interface) que será um array que armazena os fake employee
  corretores_cm = new MatTableDataSource<IEmployee>(CORRETORES_CM);  //corretores é do tipo Employee (interface) que será um array que armazena os fake employee
  corretores = [this.corretores_ct, this.corretores_cm];
  @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //console.log(this.corretores_cm);
    console.log(this.corretores[1].data[1].nome);
  }

  ngAfterViewInit() {
    this.corretores_ct.paginator = this.paginator.first;
    this.corretores_cm.paginator = this.paginator.last;
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
