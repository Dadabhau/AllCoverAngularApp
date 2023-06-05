import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: any;
  constructor(
    private route: Router,
    public actRoute: ActivatedRoute,
    private productService: ProductsService
  ) {}
  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.product = res['product'];
    });
    // let getId = this.actRoute.snapshot.params['id'];
    // console.log(getId);
    // this.getProduct(getId);
  }
  // getProduct(id: any) {
  //   this.productService.getProduct(id).subscribe((res: Product[]) => {
  //     this.product = res;
  //     console.log(this.product);
  //   });
  // }
}
