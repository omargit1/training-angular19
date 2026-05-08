import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, mapTo, switchMap, tap } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  reference: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(tap((products) => this.productsSubject.next(products || [])));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      switchMap((newProduct) => {
        // After adding, reload all products to ensure consistency
        return this.getAllProducts().pipe(map(() => newProduct));
      }),
    );
  }
  updateProduct(id: number, product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      switchMap((updatedProduct) => {
        // After update, reload all products to ensure BehaviorSubject is in sync
        return this.getAllProducts().pipe(map(() => updatedProduct));
      }),
    );
  }
  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { responseType: 'text' })
      .pipe(
        tap(() => {
          const currentProducts = this.productsSubject.value;
          this.productsSubject.next(currentProducts.filter((p) => p.id !== id));
        }),
        mapTo(void 0),
      );
  }
}
