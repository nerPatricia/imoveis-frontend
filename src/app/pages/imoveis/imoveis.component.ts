import { EditarImovelDialogComponent } from '../../components/editar-imovel/editar-imovel.component';
import Swal from 'sweetalert2';
import { ImgDialogComponent } from './../../components/img-dialog/img-dialog.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { Component } from '@angular/core';
import { ImoveisEndpointService } from 'src/app/service/imoveis-endpoint.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.less'],
})
export class ImoveisComponent {
  form: FormGroup;
  tipoImovel: string = 'todos';
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
      selecionados: new FormArray([], this.minSelectedCheckboxesValidator(1)),
    });

    this.preencheLista();
  }

  minSelectedCheckboxesValidator(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        // pega a lista de valores dos checkbox (boolean)
        .map((control) => control.value)
        // faz o total de checkbox checkados
        .reduce((prev, next) => (next ? prev + next : prev), 0);

      this.totalChecked = totalChecked;
      // se o valor total não é maior que o minimo, retorna uma msg de erro
      return this.totalChecked >= min ? null : { required: true };
    };

    return validator;
  }

  addCheckboxes() {
    this.imoveis.forEach(() =>
      this.selecionadosFormArray.push(new FormControl(false))
    );
  }

  getTypesSearch(event) {
    this.preencheLista(event.value);
  }

  showFullImg(imovel) {
    this.dialog.open(ImgDialogComponent, {
      data: {
        src: imovel.imagem || './../../../assets/default.png',
      },
    });
  }

  imovelModal(modalTitle, imovel?) {
    this.dialog.open(EditarImovelDialogComponent, {
      data: {
        imovel: imovel || null,
        modalTitle: modalTitle || null
      },
      width: '700px',
      backdropClass: 'modal-menor',
    });
  }

  deletarImovel(imovel) {
    Swal.fire({
      icon: 'warning',
      title: 'Deseja mesmo remover este imóvel?',
      confirmButtonText: 'Remover',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.imoveisService
          .removeImoveisById(imovel.codigo)
          .then((response) => {
            Swal.fire('Removido com sucesso', '', 'success').then(() => {
              window.location.reload();
            }),
              (error) => {
                console.log(error);
              };
          });
      }
    });
  }

  removerSelecionados() {
    let codigos = [];
    this.selecionadosFormArray.value.forEach((item, index) => {
      if (item) {
        codigos.push(this.imoveis[index].codigo);
      }
    });
    console.log(codigos);

    Swal.fire({
      icon: 'warning',
      title: 'Deseja mesmo remover estes imóveis selecionados?',
      confirmButtonText: 'Remover',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.imoveisService
          .removeImoveisSelecionados({ codigos })
          .then((response) => {
            Swal.fire('Removidos com sucesso', '', 'success').then(() => {
              window.location.reload();
            }),
              (error) => {
                console.log(error);
              };
          });
      }
    });
  }

  preencheLista(tipoImovel = 'todos') {
    this.imoveisService.getAllImoveisByType(tipoImovel).then(
      (response: any) => {
        this.imoveis = response.imoveis;
        this.addCheckboxes();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
