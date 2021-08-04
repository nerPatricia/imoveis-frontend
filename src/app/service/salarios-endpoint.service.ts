import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SalariosEndpointService {
  backendUrl = environment.backend;

  constructor(private client: HttpClient) {}

  getSalario(info) {
    const url = this.backendUrl + '/salario';
    return this.client.post(url, info).toPromise();
  }
}
