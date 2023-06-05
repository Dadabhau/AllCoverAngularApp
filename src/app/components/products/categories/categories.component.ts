import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/products/categories/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  allCategories: any;
  constructor(private cateService: CategoriesService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.cateService.getAllCategories().subscribe((response) => {
      this.allCategories = response;
      console.log(this.allCategories);
    });
  }
}
