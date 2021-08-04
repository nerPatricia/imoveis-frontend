import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getAllImoveisByType(type) {
    const url = this.backendUrl + '/imovel/listar?tipos=' + 
      (type != 'todos' ? '["' + type + '"]' : 'todos');
    return this.client.get(url).toPromise();
  }

  removeImoveisById(codigo) {
    const url = this.backendUrl + '/imovel/deletar/' + codigo;
    return this.client.delete(url).toPromise();
  }

  removeImoveisSelecionados(codigos) {
    const url = this.backendUrl + '/imovel/deletarLista';
    return this.client.post(url, codigos).toPromise();
  }

  getAllImoveisUrbanos() {
    console.log(this.urbanos);
    return this.urbanos;
  }
}
