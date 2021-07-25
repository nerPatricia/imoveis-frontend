import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImoveisEndpointService {
  backendUrl = environment.backend;

  //TODO: remover esse mock e adicionar funções que acessar o backend;
  urbanos = [
    {
      codigo: '100',
      tipo: 'Casa',
      descricao: 'Casa na Boa Vista com 4 quartos, cozinha americana e sala conjugada, 2 banheiros e área externa.',
      proprietarioDoImovel: 'livia g.',
      precoSolicitado: '400.000,00',
      imagem: null,
      dataDeCadastro: null,
    },
    {
      codigo: '101',
      tipo: 'Apartamento',
      descricao: 'Apartamento na Varginha no Edificio DeVille. Possui 3 quartos, sala, cozinha, área de serviço e vaga na garagem.',
      proprietarioDoImovel: 'luis h. de souza',
      precoSolicitado: '800.000,00',
      imagem: null,
      dataDeCadastro: null
    }
  ];

  constructor(private client: HttpClient) {}

  addImovel(imovel) {
    const url = this.backendUrl + '/imovel/cadastrar';
    return this.client.post(url, imovel).toPromise();
  }

  updateImovelById(imovel, id) {
    const url = this.backendUrl + '/imovel/alterar/' + id;
    return this.client.put(url, imovel).toPromise();
  }

  addImgImovel(img) {
    const url = this.backendUrl + '/imagem/salvar';
    return this.client.post(url, img).toPromise();
  }

  getAllImoveisByType(types) {
    const url = this.backendUrl + '/imagem/listar?tipos=' + types;
    console.log(url);
    // return this.client.get(url).toPromise();
  }

  getAllImoveisUrbanos() {
    console.log(this.urbanos);
    return this.urbanos;
  }
}
