import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Address, AddressService } from '@maa/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'hb-admin-address-form',
  templateUrl: './address-form.component.html',
  styles: [],
})
export class AddressFormComponent implements OnInit {
  addressFormArray: FormArray;
  form: FormGroup;
  addressData: any;
  isSubmitted = false;
  editmode = false;
  currentUserId: number;
  countries = [
    {
      id: 'India',
      name: 'India',
    },
  ];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initAddressForm();
    this._checkEditMode();
  }

  private _initAddressForm() {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  private _addAddress(address: Address) {
    this.addressService.createAddress(address).subscribe(
      (address: Address) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Address ${address.id} is created!`,
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
          detail: 'Address is not created!',
        });
      }
    );
  }

  private _updateAddress(address: Address) {
    this.addressService.updateAddress(address).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Address is updated!',
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
          detail: 'Address is not updated!',
        });
      }
    );
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.addressService.getAddress(params.id).subscribe((address) => {
          this.addressData = address;
          this._initAddressForm();
          // this.addressForm.full_name.setValue(address.full_name);
          // this.addressForm.email.setValue(address.email);
          // this.addressForm.contact.setValue(address.contact);
          // this.addressForm.role.setValue(address.role);
          // this.addressForm.password.setValidators([]);
          // this.addressForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const address: Address = {
      // user_id: this.currentUserId,
      // full_name: this.addressForm.full_name.value,
      // email: this.addressForm.email.value,
      // contact: this.addressForm.phone.value,
      // role: this.addressForm.contact.value,
    };
    if (this.editmode) {
      this._updateAddress(address);
    } else {
      this._addAddress(address);
    }
  }

  onCancle() {
    this.location.back();
  }

  get addressForm() {
    return this.form.controls;
  }
}
