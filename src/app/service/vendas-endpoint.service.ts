import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VendasEndpointService {
  backendUrl = environment.backend;

  constructor(private client: HttpClient) {}

  addVenda(venda) {
    const url = this.backendUrl + '/venda/cadastrar';
    return this.client.post(url, venda).toPromise();
  }

  updateVendaById(venda, id) {
    const url = this.backendUrl + '/venda/alterar/' + id;
    return this.client.put(url, venda).toPromise();
  }

  getAllVendas() {
    const url = this.backendUrl + '/venda/listar';
    return this.client.get(url).toPromise();
  }
}
