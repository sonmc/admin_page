import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/containers/services/category/category.service';
declare var $: any;

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
})
export class ProductTypeComponent implements OnInit {
  categories: any = [];
  category: any = {};
  type: any = '';
  messageError: any = '';

  dataSearch: any = {
    category_name: '',
    page: 0,
    pageSize: 0,
  };

  categoryDetault: any = {
    id: '',
    name_category: '',
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .get()
      .then((res: any) => {
        if (res) {
          this.categories = res;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  }

  openModalUpdate = (categoryDetail: any) => {
    if (categoryDetail) {
      this.category = Object.assign({}, categoryDetail);
      this.type = 'UPDATE';
    } else {
      this.category = Object.assign({}, this.categoryDetault);
      this.type = 'CREATE';
    }

    $('#updateCaModal').modal('show');
  };

  create = (categoryCreate: any) => {
    this.categoryService
      .create(categoryCreate)
      .then((res: any) => {
        if (res) {
          this.categories.push(res);
          $('#updateCaModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  update = (caUpdate: any) => {
    this.categoryService
      .update(caUpdate)
      .then((res: any) => {
        if (res) {
          this.categories.forEach((element: any, index: number) => {
            if (element.ID === res.ID) {
              this.categories[index] = res;
            }
          });
          $('#updateCaModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  save = () => {
    if (!this.dataSearch.category_name) {
      if (this.type === 'CREATE') {
        this.create(this.category);
      } else {
        this.update(this.category);
      }
    } else {
      this.messageError = 'Loại sản phẩm không được để trống !';
    }
  };

  search = () => {
    this.categoryService
      .search(this.dataSearch)
      .then((res: any) => {
        if (res) {
          this.categories = res.data;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  close = () => {
    this.category = Object.assign({}, this.categoryDetault);
    $('#updateCaModal').modal('hide');
  };

  resetFormAddCa = () => {
    this.category = Object.assign({}, this.categoryDetault);
  };

  remove = (caId: number) => {
    this.categoryService
      .remove(caId)
      .then((res: any) => {
        if (res) {
          this.categories = this.categories.filter((x: any) => x.id !== res.id);
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };
}
