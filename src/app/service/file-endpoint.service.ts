import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FileEndpointService {
  backendUrl = environment.backend;

  constructor(private client: HttpClient) {}

  saveImage(multiPartForm) {
    const url = this.backendUrl + "/imagem/salvar";
    return this.client.post(url, multiPartForm).toPromise();
  }
}
