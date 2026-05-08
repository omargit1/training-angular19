import { Routes } from '@angular/router';
import { TdfFormComponent } from './tdf-form/tdf-form.component';
import { ProductAdd } from './product-add/product-add';
import { ProductDetails } from './product-details/product-details';
import { ProductList } from './product-list/product-list';
import { ProductEdit } from './product-edit/product-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'tdf-form', pathMatch: 'full' },
  { path: 'tdf-form', component: TdfFormComponent },
  { path: 'product-list', component: ProductList },
  { path: 'product-add', component: ProductAdd },
  { path: 'product-edit/:id', component: ProductEdit },
  { path: 'product-details/:id', component: ProductDetails },
];
