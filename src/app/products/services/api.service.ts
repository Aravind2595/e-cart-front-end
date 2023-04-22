import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //to hold serach term as behaviour subject
  searchTerm = new BehaviorSubject('');
  //to hold cart total count
  cartItemCount = new BehaviorSubject(0);

  //BASE_URL = 'http://localhost:3000';

  //deployed node server-https://ecart-urkq.onrender.com/
  BASE_URL = 'https://ecart-urkq.onrender.com';

  constructor(private http: HttpClient) {
    this.cartCount();
  }

  //get all products api
  getAllProducts() {
    //call api
    return this.http.get(`${this.BASE_URL}/products/get-all-products`);
  }

  //view product detail get
  viewAproduct(id: any) {
    //call api
    return this.http.get(`${this.BASE_URL}/products/${id}`);
  }

  ///products/add-to-wishlist
  addtowishlist(product: any) {
    //call api
    const body = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    };
    return this.http.post(`${this.BASE_URL}/products/add-to-wishlist`, body);
  }

  //get all items from wishlist
  getWishlistItems() {
    //call api
    return this.http.get(`${this.BASE_URL}/wishlist/get-all-items`);
  }

  //removing an item from wishlist
  removeWishlist(id: any) {
    //api call
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`);
  }

  //add to cart
  addToCart(product: any) {
    const body = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    };
    //api call
    return this.http.post(`${this.BASE_URL}/products/add-to-cart`, body);
  }

  //getcart
  getCart() {
    //call api
    return this.http.get(`${this.BASE_URL}/cart/get-all-items`);
  }

  //cartcount
  cartCount() {
    //call api
    this.getCart().subscribe((result: any) => {
      this.cartItemCount.next(result.length);
    });
  }

  //removecart item from api
  removeCartItem(id: any) {
    //api call
    return this.http.delete(`${this.BASE_URL}/cart/item/${id}`);
  }

  //incremet cart item
  incCartItem(id: any) {
    //api call
    return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`);
  }

  //decrement cart item
  decCartItem(id: any) {
    //api call
    return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`);
  }

  //empty cart
  emptyCart() {
    //api call
    return this.http.delete(`${this.BASE_URL}/cart/empty-cart`);
  }
}
