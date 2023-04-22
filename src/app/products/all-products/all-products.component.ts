import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allProducts: any = [];
  searchKey: string = '';
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    //make api call to get all products
    this.api.getAllProducts().subscribe(
      (result: any) => {
        console.log(result);
        this.allProducts = result;
      },
      (result: any) => {
        console.log(result.error);
      }
    );

    //get behavior subject
    this.api.searchTerm.subscribe((result: any) => {
      this.searchKey = result;
    });
  }

  //addtocart
  addtocart(product: any) {
    //add quantity key to product object with value as 1
    Object.assign(product, { quantity: 1 });
    //call api
    this.api.addToCart(product).subscribe(
      //200
      (result: any) => {
        //call method to get cart count
        this.api.cartCount();
        alert(result);
      },
      //400
      (result: any) => {
        alert(result.error);
      }
    );
  }
}
