import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee } from 'src/app/interfaces/corretores_model';
import { EditarCorretorDialogComponent } from 'src/app/components/editar-corretor/editar-corretor.component';
import { MatDialog } from '@angular/material/dialog';
import { CorretoresEndpointService } from 'src/app/service/corretores-endpoint.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-corretores',
  templateUrl: './corretores.component.html',
  styleUrls: ['./corretores.component.less']
})
export class CorretoresComponent implements OnInit, AfterViewInit {
  corretores = new MatTableDataSource<IEmployee>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private corretoresService: CorretoresEndpointService,
    public dialog: MatDialog
  ) {
    this.preencheLista();
  }

  ngOnInit(): void {
    console.log(this.corretores);
  }

  ngAfterViewInit() {
    this.corretores.paginator = this.paginator;
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

  changeTab(event){
    if(event.index == 0)
      this.preencheLista("Contratado");
    else
      this.preencheLista("Comissionado");
    // if(this.tipoCorretor == "Contratado")
    //   this.tipoCorretor = "Comissionado";
    // else
    //   this.tipoCorretor = "Contratado";
  }

  preencheLista(tipoCorretor = "Contratado") {
    this.corretoresService.getAllCorretoresByType(tipoCorretor).then(
      (response: any) => {
        this.corretores = response.corretores;
      }, error => {
        console.log(error); 
      }
    )
  }
}
