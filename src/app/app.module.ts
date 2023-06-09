import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { LoggingInteceptorService } from './services/auth/logging-interceptor.service';
import { LoadingspinnerComponent } from './shared/loadingspinner/loadingspinner.component';
import { HeaderComponent } from './header/header.component';

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
    LoadingspinnerComponent,
    HeaderComponent,
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
    // Added Guard Here
    AuthGuard,
    CanDeactivateGuard,
    ProductsResolverService,
    ProductResolverService,
    // Added Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInteceptorService,
      multi: true,
    },
    // Added Multiple Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
