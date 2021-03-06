import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from '@maa/orders';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, OrdersModule, RouterModule, ButtonModule],
  declarations: [
    ProductsSearchComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
  ],
  exports: [
    ProductsSearchComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
  ],
})
export class ProductsModule {}
