import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/containers/services/category/category.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
})
export class ProductTypeComponent implements OnInit {
  categories: any = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .get()
      .then((res: any) => {
        if (res) {
          this.categories = res.data;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  }
  openModalUpdate = (ca: any) => {};
  save = () => {};
  remove = (caId: number) => {
    this.categoryService
      .remove(caId)
      .then((res: any) => {
        if (res) {
          this.categories = this.categories.filter(
            (x: any) => x.user_id !== res.user_id
          );
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };
  search = () => {};
}
