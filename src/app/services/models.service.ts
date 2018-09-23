import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modelos, Fabricantes } from '../product/product.component';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private _urlModelos = 'assets/json/modelos-carros.json';
  private _urlFabricantes = 'assets/json/fabricantes-carros.json';

  constructor(private _httpClient: HttpClient) { }

  getModelos() {
    return this._httpClient.get<Modelos[]>(this._urlModelos);
  }

  getFabricantes() {
    return this._httpClient.get<Fabricantes[]>(this._urlFabricantes);
  }
}
