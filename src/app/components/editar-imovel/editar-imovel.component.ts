import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-imovel-component',
  templateUrl: 'editar-imovel.component.html',
  styleUrls: ['editar-imovel.component.less']
})
export class EditarImovelDialogComponent {
  form: FormGroup;
  img = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarImovelDialogComponent>,
    private fb: FormBuilder
  ) {
    //TODO: iniciar o form reativo no html
    //TODO: pegar os dados que ta vindo no parametro e adicionar nesse form
    //TODO: adicionar mascara de preço e de data
    this.form = this.fb.group({
      codigo: new FormControl(''),
      tipo: new FormControl(''),
      imagemPath: new FormControl(''),
      imagem: new FormControl(''),
      descricao: new FormControl(''),
      proprietario: new FormControl(''),
      preco: new FormControl(''),
      dataCadastro: new FormControl('')
    });
  }

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }

  atualizar() {
    //TODO: chamar a url de atualizar informações do imovel
  }

  imgNull() {
    this.img = null;
  }

  onSelectFile(event) {
    //TODO: testar essa função pra ver se ta pegando a img certo

    // toda vez que a imagem alterar vai chamar a função
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file.type);

      // só aceita imagens png
      if (file.type.includes('png')) {
        const reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event: any) => {
          // called once readAsDataURL is completed
          const base64 = event.target.result.substring(
            event.target.result.lastIndexOf(',') + 1,
            event.target.result.length
          );
          console.log(base64);
          this.img = event.target.result; // substitui o src pelo da nova img
          this.form.get('imagem').setValue(base64);
        };
      } else {
        Swal.fire({
          title: 'Atenção',
          text: 'Entre com uma imagem válida',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}
