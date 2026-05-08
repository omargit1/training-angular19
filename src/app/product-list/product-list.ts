import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService, Product } from '../service/productservice';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgbPaginationModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText = '';
  page = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50];
  isLoading = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Load initial data when component initializes
    this.loadProducts();

    // Reload products whenever we navigate to this route
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadProducts();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get displayedProducts(): Product[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts?.slice(start, start + this.pageSize) || [];
  }

  deleteProduct(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.errorMessage = '';
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.errorMessage = '';
          // Reload list after deletion
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.errorMessage = 'Erreur lors de la suppression du produit.';
        },
      });
    }
  }

  loadProducts() {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products || [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Impossible de charger les produits.';
        this.isLoading = false;
      },
    });
  }

  applyFilter() {
    const search = this.searchText.trim().toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      [product.name, product.description, product.reference]
        .join(' ')
        .toLowerCase()
        .includes(search),
    );
    this.page = 1;
  }

  onPageSizeChange(value: number) {
    this.pageSize = Number(value) || 5;
    this.page = 1;
  }

  trackByProduct(_index: number, product: Product) {
    return product.id;
  }

  ngAfterViewInit() {
    // Force reload whenever this component view is initialized
    // This catches route reuse scenarios
  }
}
