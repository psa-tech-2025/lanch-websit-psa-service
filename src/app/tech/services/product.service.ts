import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = environment.apiBase;
  private baseUrl = `${this.BASE_URL}/api`;

  constructor(private http: HttpClient) {}

  // ===============================
  // GET ALL PRODUCTS
  // ===============================
  getAllProducts(projectId: string = 'Ecom-02'): Observable<Product[]> {

    const headers = new HttpHeaders({
      'x-project-id': projectId
    });

    return this.http.get<Product[]>(
      `${this.baseUrl}/products`,
      { headers }
    );
  }

  // ===============================
  // GET PRODUCT BY ID
  // ===============================
  getProductById(
    idOrCode: string,
    projectId: string = 'Ecom-02'
  ): Observable<Product> {

    const headers = new HttpHeaders({
      'x-project-id': projectId
    });

    return this.http.get<Product>(
      `${this.baseUrl}/products/${idOrCode}`,
      { headers }
    );
  }
}