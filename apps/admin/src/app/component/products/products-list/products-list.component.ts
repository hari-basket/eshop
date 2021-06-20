import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@maa/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'hb-admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products = new Array<Product>();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productid: number) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!',
            });
          }
        );
      },
    });
  }
}
