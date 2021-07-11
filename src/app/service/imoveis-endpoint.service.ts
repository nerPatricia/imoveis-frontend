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
      cod: '100',
      tipo: 'Casa',
      descricao: 'Casa na Boa Vista com 4 quartos, cozinha americana e sala conjugada, 2 banheiros e área externa.',
      proprietario: 'livia g.',
      preco: '400.000,00',
      imagem: null,
      dataCadastro: null,
    },
    {
      cod: '101',
      tipo: 'Apartamento',
      descricao: 'Apartamento na Varginha no Edificio DeVille. Possui 3 quartos, sala, cozinha, área de serviço e vaga na garagem.',
      proprietario: 'luis h. de souza',
      preco: '800.000,00',
      imagem: null,
      dataCadastro: null
    }
  ];

  constructor(private client: HttpClient) {}

  getAllImoveisUrbanos() {
    console.log(this.urbanos);
    return this.urbanos;
  }

  // getGameById(consoleType: string, gameId): Observable<any> {
  //   const url = this.backendUrl + '/' + consoleType + '/game/' + gameId;
  //   return this.client.get(url);
  // }

  // registerReview(reviewData): Observable<any> {
  //   const url = this.backendUrl + '/review';
  //   return this.client.post(url, reviewData);
  // }
}
