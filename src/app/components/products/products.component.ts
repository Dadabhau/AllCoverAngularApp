import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from 'src/app/interfaces/product';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allproduct: Product[] = [];
  error = null;

  // Get Sort param type
  sortParam: Params;
  constructor(
    private productService: ProductsService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Resolver Variable get from Param
    this.allproduct = this.actRoute.snapshot.data['products'];

    // Get Sort Param from URL
    this.actRoute.queryParams.subscribe((param) => {
      this.sortParam = param;
    });
    console.log(this.allproduct, this.sortParam);
  }

  // Get All Product call
  fetchAllProduct() {
    this.productService.getAllProducts().subscribe(
      (resp: Product[]) => {
        this.allproduct = resp;
        console.log(this.allproduct);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }

  // Get product sort with Param
  sortDesc() {
    this.productService.sortProduct(this.sortParam.sort).subscribe(
      (resp: Product[]) => {
        this.allproduct = resp;
        console.log(this.allproduct);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }
}
