import { EditarImovelDialogComponent } from '../../components/editar-imovel/editar-imovel.component';
import Swal from 'sweetalert2';
import { ImgDialogComponent } from './../../components/img-dialog/img-dialog.component';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ImoveisEndpointService } from 'src/app/service/imoveis-endpoint.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.less'],
})
export class ImoveisComponent implements OnInit {
  form: FormGroup;
  tipoImovel: string = "todos";
  totalChecked = 0;
  imoveis = []; // TODO: imoveis é da interface imoveis que precisa ser criada

  get selecionadosFormArray() {
    return this.form.controls.selecionados as FormArray;
  }

  constructor(
    private imoveisService: ImoveisEndpointService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      selecionados: new FormArray([], this.minSelectedCheckboxesValidator(1))
    });

    // async imoveis (trocar depois pela chamada http)
    of(this.imoveisService.getAllImoveisUrbanos()).subscribe(imoveis => {
      this.imoveis = imoveis;
      this.addCheckboxes();
    });
  }

  minSelectedCheckboxesValidator(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        // pega a lista de valores dos checkbox (boolean)
        .map(control => control.value)
        // faz o total de checkbox checkados
        .reduce((prev, next) => next ? prev + next : prev, 0);
      
      this.totalChecked = totalChecked;
      // se o valor total não é maior que o minimo, retorna uma msg de erro
      return this.totalChecked >= min ? null : { required: true };
    };
  
    return validator;
  }

  addCheckboxes() {
    this.imoveis.forEach(() => this.selecionadosFormArray.push(new FormControl(false)));
  }

  getTypesSearch(event) {
    this.preencheLista(event.value);
  }

  showFullImg(imovel) {
    this.dialog.open(ImgDialogComponent, {
      data: {
        src: imovel.imagem || './../../../assets/default.png'
      }
    });
  }

  imovelModal(imovel?) {
    this.dialog.open(EditarImovelDialogComponent, {
      data: {
        imovel: imovel || null
      },
      width: '700px',
      backdropClass: 'modal-menor'
    });
  }

  deletarImovel(imovel) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja mesmo remover este imóvel?',
      confirmButtonText: 'Remover',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: acessar o endpoint de remover imovel aqui 
        // tem o objeto do imovel selecionado no parametro pra pegar as informações
        // se precisar dar um reload na tela depois, usar window.location.reload()
        console.log(imovel);
        const codigos = [
          imovel.codigo
        ];
        // TODO: NAO TA FUNCIONANDO
        this.imoveisService.removeImoveis({ codigos }).then(
          (response) => {
            Swal.fire('Removido com sucesso', '', 'success').then(
              () => {
                window.location.reload();
              }
            ), error => {
              console.log(error);
            }
          }
        )
        
      }
    })
  }

  removerSelecionados() {
    // TODO: perguntar se deseja mesmo remover
    // TODO: varrer os selecionados e remover todos
    // TODO: acessar a url de remover do backend
  }

  ngOnInit() {
    this.preencheLista();
  }

  preencheLista(tipoImovel = 'todos') {
    this.imoveisService.getAllImoveisByType(tipoImovel).then(
      (response: any) => {
        this.imoveis = response.imoveis;
      }, error => {
        console.log(error);
      }
    )
  }
}
