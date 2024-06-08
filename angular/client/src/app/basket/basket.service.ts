import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/envrionment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';
import { UntypedFormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  
  // the below two lines establish a behavior subject and create an observable for it
  // this allows multiple subscribers to view a piece of data and respond and react to its
  // changes, this is a land mark concept that should be remembered
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    this.http.get<Basket>(this.baseUrl + "basket?id=" + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket){
    this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, qunatity = 1){
    if(this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, qunatity);
    this.setBasket(basket);
  }
  
  removeItemFromBasket(id: number, quanitity = 1){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quanitity -= quanitity;
      if(item.quanitity === 0){
        basket.items = basket.items.filter(x =>  x.id !== id);
      }
      if(basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }

  }
  
  deleteBasket(basket: Basket) {
    throw new Error('Method not implemented.');
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, qunatity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if(item){
      item.quanitity += qunatity;
    } else {
      itemToAdd.quanitity = qunatity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket{
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item : Product) : BasketItem {
    return{
      id: item.id,
      productName: item.name,
      price: item.price,
      quanitity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    if(!basket) return;
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quanitity) + a, 0)
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal})
  }

  private isProduct(item: Product | BasketItem): item is Product{
    return (item as Product).productBrand !== undefined;
  }
}
