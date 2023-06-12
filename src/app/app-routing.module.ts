import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product/product.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/users/user/add-user/add-user.component';
import { EditUserComponent } from './components/users/user/edit-user/edit-user.component';
import { UserComponent } from './components/users/user/user.component';
import { AuthGuard } from './services/auth/auth-guard.service';
import { ProductsResolverService } from './services/products/products-resolver.service';
import { ProductResolverService } from './services/products/categories/product-resolver.service';
import { HomeComponent } from './components/home/home.component';
import { CanDeactivateGuard } from './components/home/can-deactivate-guard.service';
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: { showHeader: false },
  },
  {
    path: 'home',
    component: HomeComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoriesComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: { products: ProductsResolverService },
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    resolve: { product: ProductResolverService },
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { message: 'User Page Router Data' },
  },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/:id/edit', component: EditUserComponent },
  { path: 'adduser', component: AddUserComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  // Location Strategies Old Browser
  // imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
