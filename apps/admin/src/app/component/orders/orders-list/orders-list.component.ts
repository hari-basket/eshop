import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderItem, OrdersService } from '@maa/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'hb-admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus;
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.orderStatus = ORDER_STATUS;
  }

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!',
            });
          }
        );
      },
    });
  }
}
