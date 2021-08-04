import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RelatoriosEndpointService {
  backendUrl = environment.backend;

  constructor(private client: HttpClient) {}

  getRelatorios(info) {
    const url = this.backendUrl + '/relatorio';
    return this.client.post(url, info).toPromise();
  }
}
