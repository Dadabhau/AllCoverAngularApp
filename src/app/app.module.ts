import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { CategoryComponent } from './components/products/categories/category/category.component';
import { ProductComponent } from './components/products/product/product.component';
import { CartsComponent } from './components/products/carts/carts.component';
import { CartComponent } from './components/products/carts/cart/cart.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/users/user/user.component';
import { EditUserComponent } from './components/users/user/edit-user/edit-user.component';
import { AddUserComponent } from './components/users/user/add-user/add-user.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { ProductsResolverService } from './services/products/products-resolver.service';
import { ProductResolverService } from './services/products/categories/product-resolver.service';
import { HomeComponent } from './components/home/home.component';
import { CanDeactivateGuard } from './components/home/can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductComponent,
    CartsComponent,
    CartComponent,
    UsersComponent,
    UserComponent,
    EditUserComponent,
    AddUserComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    ProductsResolverService,
    ProductResolverService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
