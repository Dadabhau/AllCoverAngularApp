import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from './products.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private productService: ProductsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    return this.productService.getAllProducts();
  }
}
