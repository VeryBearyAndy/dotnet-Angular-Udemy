import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagenation } from '../shared/models/pagenation';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Pagenation<Product[]>>(this.baseUrl + 'products');
  }
}
