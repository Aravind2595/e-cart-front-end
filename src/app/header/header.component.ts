import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalItemCount: Number = 0;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.cartItemCount.subscribe((count: any) => {
      this.totalItemCount = count;
    });
  }
  search(event: any) {
    //assign value to behavior subject
    this.api.searchTerm.next(event.target.value);
  }
}
