import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagenation } from '../shared/models/pagenation';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) { }

  getProduct(id: number){
    return this.http.get<Product>(this.baseUrl + "products/" + id)
  }

  getProducts(shopParams : ShopParams) {
    let params = new HttpParams()
    if(shopParams.brandId > 0) 
      params = params.append('brandId', shopParams.brandId);
    if(shopParams.typeId > 0)
      params = params.append('typeId', shopParams.typeId);
      
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    
    if(shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagenation<Product[]>>(this.baseUrl + 'products', {params});
  }

  getBrands(){
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
