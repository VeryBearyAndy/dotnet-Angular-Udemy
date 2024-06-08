import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product?: Product
  quantity = 1;
  qunaitityInBasket = 0;

  constructor(private shopService: ShopService, private activatedRoute : ActivatedRoute,
    private bcServeice: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcServeice.set('@productDetails', ' ')
  }
  
  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id)
      this.shopService.getProduct(+id).subscribe({
        next: product => {
          this.product = product;
          this.bcServeice.set('@productDetails', product.name)
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: basket => {
              const item = basket?.items.find(x => x.id === +id);
              if(item){
                this.quantity = item.quanitity;
                this.qunaitityInBasket = item.quanitity;
              }
            }
          })
        },
        error: error =>  console.log(error),
      });
  }

  incrementQuantitiy() {
    this.quantity++
  }
  
  decrementQuantity(){
    this.quantity--
  }

  updateBasket(){
    if(this.product){
      if(this.quantity > this.qunaitityInBasket) {
        const itemsToAdd = this.quantity - this.qunaitityInBasket;
        this.qunaitityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.qunaitityInBasket - this.quantity;
        this.qunaitityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText() {
    return this.qunaitityInBasket === 0 ? 'Add to Basket' : 'Update Basket';
  }

}
