import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../service/productservice';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
})
export class ProductEdit implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    reference: '',
  };

  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.errorMessage = 'Produit introuvable.';
      return;
    }

    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = 'Impossible de charger le produit.';
        this.isLoading = false;
      },
    });
  }

  submitForm(productForm: NgForm) {
    if (productForm.invalid || !this.product.id) {
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

    this.productService.updateProduct(this.product.id, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/product-list']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.errorMessage =
          'Une erreur est survenue lors de la mise à jour du produit.';
        this.isSubmitting = false;
      },
    });
  }
}
