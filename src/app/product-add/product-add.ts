import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService, Product } from '../service/productservice';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-add.html',
  styleUrl: './product-add.css',
})
export class ProductAdd {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    reference: '',
  };

  isSubmitting = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  submitForm(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      reference: this.product.reference,
    };

    this.productService.addProduct(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/product-list']);
      },
      error: (error: any) => {
        console.error(error);
        this.errorMessage =
          'Une erreur est survenue lors de l’ajout du produit.';
        this.isSubmitting = false;
      },
    });
  }
}
