import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImoveisEndpointService {
  backendUrl = environment.backend;

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
    if(type == 'urbano'){
      const url = this.backendUrl + '/imovel/listar?tipos=[]&local=urbano'
      return this.client.get(url).toPromise(); 
    } else if (type == 'rural'){
      const url = this.backendUrl + '/imovel/listar?tipos=[]&local=rural'
      return this.client.get(url).toPromise(); 
    } else {
      const url = this.backendUrl + '/imovel/listar?tipos=' + 
      (type != 'todos' ? '["' + type + '"]' : 'todos');
      return this.client.get(url).toPromise(); 
    }
  }

  removeImoveisById(codigo) {
    const url = this.backendUrl + '/imovel/deletar/' + codigo;
    return this.client.delete(url).toPromise();
  }

  removeImoveisSelecionados(codigos) {
    const url = this.backendUrl + '/imovel/deletarLista';
    return this.client.post(url, codigos).toPromise();
  }
}
