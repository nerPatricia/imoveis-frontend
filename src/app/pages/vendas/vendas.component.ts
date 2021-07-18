import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

// -- Importações do modelo Vendas --
import { Venda } from 'src/app/interfaces/vendas_model';
import { vendasList } from '../../interfaces/vendas_mock'; //APENAS PARA TESTES
import { EditarVendaDialogComponent } from 'src/app/components/editar-venda/editar-venda.component';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.less']
})

export class VendasComponent implements OnInit {
  vendas: Venda[] = vendasList; //APENAS PARA TESTES
  form: FormGroup;
  totalChecked = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    console.log(this.vendas);
  }

  vendaModal(venda?) {
    console.log(venda);
    this.dialog.open(EditarVendaDialogComponent, { //ALTERAR PARA VENDAS
      data: {
        venda: venda || null
      },
      width: '700px',
      backdropClass: 'modal-menor'
    });
  }

  deletarVendas(corretor) { //ALTERAR PARA VENDAS
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
