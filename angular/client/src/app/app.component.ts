import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './shared/models/product';
import { Pagenation } from './shared/models/pagenation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'BearNet';
  products: Product[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Pagenation<Product>>('https://localhost:5001/api/products?pageSize=50').subscribe({
      next: (response: any) => this.products = response.data, //what to do next
      error: error => console.log(error), //what to do if there is an error
      complete: () =>{
        console.log("request completed");
        console.log("request statement");
      }
    })
  }
}
