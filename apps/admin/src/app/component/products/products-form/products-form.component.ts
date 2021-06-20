import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '@maa/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'hb-admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form = new FormGroup({});
  isSubmitted = false;
  sellingUnits = [
    {
      key: 'Kg',
      value: 'kg',
    },
    {
      key: 'Piece',
      value: 'pieces',
    },
    {
      key: 'Packet',
      value: 'packets',
    },
  ];
  imageDisplay: string | ArrayBuffer;
  currentProductId = -1;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      product_desc: ['', Validators.required],
      available_units: [0.0, Validators.required],
      rich_desc: [''],
      product_url: [''],
      product_urls: [[]],
      price: [0.0],
      status: ['in_stock'],
      selling_unit: ['kg'],
      allowed_discount: [0],
      is_featured: [false],
      product_img: [''],
    });
  }

  private _addProduct(productData: any) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product is created!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!',
        });
      }
    );
  }

  private _updateProduct(productFormData: any) {
    this.productsService
      .updateProduct(productFormData, this.currentProductId)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product is updated!',
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        }
      );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.product_desc.setValue(product.product_desc);
          this.productForm.price.setValue(product.price);
          this.productForm.allowed_discount.setValue(product.allowed_discount);
          this.productForm.status.setValue(product.status);
          this.productForm.is_featured.setValue(product.is_featured);
          this.productForm.selling_unit.setValue(product.selling_unit);
          this.productForm.rich_desc.setValue(product.rich_desc);
          this.imageDisplay = product.product_url;
          this.productForm.product_url.setValidators([]);
          this.productForm.product_url.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const productFormData = new FormData(),
      formObj = {};
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
      formObj[key] = this.productForm[key].value;
    });
    if (this.editmode) {
      // formObj['id'] = this.currentProductId;
      // @ts-ignore
      productFormData.append('id', this.currentProductId);

      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  onCancle() {
    // cancel called
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ product_img: file });
      this.form.get('product_url').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }
}
