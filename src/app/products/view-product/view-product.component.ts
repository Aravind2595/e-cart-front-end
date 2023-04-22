import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  //to hold product id
  productId: string = '';
  //to hold product detail
  product: any = {};
  constructor(
    private viewActivatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    //get path parameter from component route
    this.viewActivatedRoute.params.subscribe((data: any) => {
      console.log(data.id);
      this.productId = data.id;
    });
    //api call to get aprticular product detail
    this.api.viewAproduct(this.productId).subscribe(
      //200
      (result: any) => {
        console.log(result);
        this.product = result;
      },
      //400
      (result: any) => {
        console.log(result.error);
      }
    );
  }

  //add to wishlist
  addToWishlist(product: any) {
    this.api.addtowishlist(product).subscribe(
      //200
      (result: any) => {
        alert(result);
      },
      //400
      (result: any) => {
        alert(result.error);
      }
    );
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
