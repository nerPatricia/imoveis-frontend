import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CorretoresEndpointService {
  backendUrl = environment.backend;

  constructor(private client: HttpClient) {}

  addCorretor(corretor) {
    const url = this.backendUrl + '/corretor/cadastrar';
    return this.client.post(url, corretor).toPromise();
  }

  updateCorretorById(corretor, id) {
    const url = this.backendUrl + '/corretor/alterar/' + id;
    return this.client.put(url, corretor).toPromise();
  }

  getAllCorretoresByType(type) {
    const url = this.backendUrl + '/corretor/listar?tipo=' + type;
    return this.client.get(url).toPromise();
  }
}
