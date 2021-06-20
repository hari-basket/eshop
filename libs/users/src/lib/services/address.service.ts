import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  apiURLAddress = environment.apiUrl + 'address';

  constructor(private http: HttpClient) {}

  getAddress(userId: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiURLAddress}/${userId}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiURLAddress, address);
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(
      `${this.apiURLAddress}/${address.id}`,
      address
    );
  }

  deleteAddress(adressId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURLAddress}/${adressId}`);
  }
}
