import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistItems: any = [];
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getWishlistItems().subscribe(
      //200
      (result: any) => {
        console.log(result);
        this.wishlistItems = result;
      },
      //400
      (result: any) => {
        alert(result.error);
      }
    );
  }

  //remove wishlist item
  removwWishlistItem(id: any) {
    //api call
    this.api.removeWishlist(id).subscribe(
      //200
      (result: any) => {
        this.wishlistItems = result;
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
        //to remove item from wishlist
        this.removwWishlistItem(product.id);
        alert(result);
      },
      //400
      (result: any) => {
        alert(result.error);
      }
    );
  }
}
