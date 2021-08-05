import { CorretoresEndpointService } from './../../service/corretores-endpoint.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEmployee } from 'src/app/interfaces/corretores_model';
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
  corretores = new MatTableDataSource<IEmployee>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private corretoresService: CorretoresEndpointService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.preencheLista("Contratado");

    // ISSO AQUI PEGA TODOS OS CORRETORES
    // this.corretoresService.getAllCorretoresByType('todos').then(
    //   (response: any) => {
    //     this.corretores = new MatTableDataSource<IEmployee>(response);
    //   }, error => {
    //     console.log(error);
    //   }
    // )
  }

  ngAfterViewInit() {
    this.corretores.paginator = this.paginator;
  }

  corretorModal(modalTitle, corretor?) {
    this.dialog.open(EditarCorretorDialogComponent, {
      data: {
        corretor: corretor || null,
        modalTitle: modalTitle || null
      },
      width: '700px',
      backdropClass: 'modal-menor'
    });
  }

  changeTab(event){
    if(event.index == 0)
      this.preencheLista("Contratado");
    else
      this.preencheLista("Comissionado");
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
