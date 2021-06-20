import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@maa/orders';
import { ProductsService } from '@maa/products';
import { UsersService } from '@maa/users';
// import { combineLatest } from 'rxjs';

@Component({
  selector: 'hb-admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics = [0, 0, 0, 0];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    console.log('.');

    //no statement
    // combineLatest([
    //   this.ordersService.getOrdersCount(),
    //   this.productService.getProductsCount(),
    //   this.userService.getUsersCount(),
    //   this.ordersService.getTotalSales()
    // ]).subscribe((values) => {
    //   this.statistics = values;
    // });
  }
}
