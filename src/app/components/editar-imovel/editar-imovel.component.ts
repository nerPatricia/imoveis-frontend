import Swal from "sweetalert2";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ImoveisEndpointService } from "src/app/service/imoveis-endpoint.service";
import { FileEndpointService } from "src/app/service/file-endpoint.service";

@Component({
  selector: "app-editar-imovel-component",
  templateUrl: "editar-imovel.component.html",
  styleUrls: ["editar-imovel.component.less"],
})
export class EditarImovelDialogComponent {
  form: FormGroup;
  img: FormData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarImovelDialogComponent>,
    private fb: FormBuilder,
    private imoveisService: ImoveisEndpointService,
    private fileService: FileEndpointService
  ) {
    //TODO: adicionar mascara de preço e de data
    //TODO: preço é number e dataDeCadastro é date
    console.log(data);
    this.form = this.fb.group({
      codigo: new FormControl(data.imovel?.codigo || "", [Validators.required]),
      tipo: new FormControl(data.imovel?.tipo || "", [Validators.required]),
      imagemPath: new FormControl(data.imovel?.imagem || "", [
        Validators.required,
      ]),
      imagem: new FormControl(data.imovel?.imagem || "", [Validators.required]),
      descricao: new FormControl(data.imovel?.descricao || "", [
        Validators.required,
      ]),
      proprietarioDoImovel: new FormControl(
        data.imovel?.proprietarioDoImovel || "",
        [Validators.required]
      ),
      precoSolicitado: new FormControl(data.imovel?.precoSolicitado || "", [
        Validators.required,
      ]),
      dataDeCadastro: new FormControl(data.imovel?.dataDeCadastro || "", [
        Validators.required,
      ]),
    });
  }

  getErrorMessage(field) {
    if (this.form.get(field)) {
      return this.form.get(field).hasError("required") ? "Campo requerido" : "";
    }
  }

  closeModal(): void {
    this.dialogRef.close({ fechouModal: true });
  }

  atualizar() {
    console.log(this.form.value);
    this.form.removeControl("imagemPath");

    this.fileService.saveImage(this.img);

    this.imoveisService.addImovel(this.form.value).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  imgNull() {
    this.img = null;
  }

  onSelectFile(event) {
    // toda vez que a imagem alterar vai chamar a função
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file.type);

      // só aceita imagens png
      if (file.type.includes("png")) {
        const reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event: any) => {
          // called once readAsDataURL is completed
          // const base64 = event.target.result.substring(
          //   event.target.result.lastIndexOf(',') + 1,
          //   event.target.result.length
          // );
          // console.log(base64);
          // this.img = event.target.result; // substitui o src pelo da nova img
          // this.form.get('imagem').setValue(base64);
          console.log(file);
          this.img = new FormData();
          this.img.append("file", file);
          console.log(this.img);
        };
      } else {
        Swal.fire({
          title: "Atenção",
          text: "Entre com uma imagem válida",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    }
  }
}
