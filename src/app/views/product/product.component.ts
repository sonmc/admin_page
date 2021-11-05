import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/containers/constants/config';
import { CategoryService } from 'src/app/containers/services/category/category.service';
import { CommonService } from 'src/app/containers/services/common/common.service';
import { ProductService } from 'src/app/containers/services/product/product.service';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  uploadStatus: string = '';

  products: any = [];
  categories: any = [];

  product: any = {};

  type: any = '';
  messageError: any = '';

  dataSearch: any = {
    pro_name: '',
    page: 0,
    pageSize: 0,
  };

  productDetault: any = {
    description: '',
    link: '',
    listed_Price: 0,
    iD_Category: '',
    name_Product: '',
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.productService
      .get()
      .then((res: any) => {
        if (res) {
          this.products = res;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });

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

  openModalUpdate = (productDetail: any) => {
    this.uploadStatus = '';
    if (productDetail) {
      this.product = Object.assign({}, productDetail);
      this.type = 'UPDATE';
    } else {
      this.product = Object.assign({}, this.productDetault);
      this.type = 'CREATE';
    }

    $('#updateProModal').modal('show');
  };

  create = (productCreate: any) => {
    this.productService
      .create(productCreate)
      .then((res: any) => {
        if (res) {
          const ca = this.categories.find(
            (x: any) => x.id == productCreate.iD_Category
          );
          this.products.push({ ...res, name_Category: ca.name_Category });
          $('#updateProModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  update = (caUpdate: any) => {
    this.productService
      .update(caUpdate)
      .then((res: any) => {
        if (res) {
          this.products.forEach((element: any, index: number) => {
            if (element.id === res.id) {
              this.products[index] = res;
            }
          });
          $('#updateProModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  validationFormData = () => {
    let isDataCorrect = true;
    if (!this.product.iD_Category || !this.product.name_Product) {
      isDataCorrect = false;
    }
    return isDataCorrect;
  };

  save = () => {
    if (this.validationFormData()) {
      if (this.type === 'CREATE') {
        this.create(this.product);
      } else {
        this.update(this.product);
      }
    } else {
      this.messageError = 'Loại sản phẩm không được để trống !';
    }
  };

  search = () => {
    this.productService
      .search(this.dataSearch)
      .then((res: any) => {
        if (res) {
          this.products = res.data;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  close = () => {
    this.product = Object.assign({}, this.productDetault);
    $('#updateProModal').modal('hide');
  };

  resetFormAddPro = () => {
    this.product = Object.assign({}, this.productDetault);
  };

  remove = (caId: number) => {
    this.productService
      .remove(caId)
      .then((res: any) => {
        if (res) {
          this.products = this.products.filter((x: any) => x.id !== res.id);
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files![0];
    if (file) {
      this.commonService
        .upload(file)
        .then((res: any) => {
          this.uploadStatus = res.message;
          this.product.images = API_URL + res.data;
        })
        .catch((e) => {
          window.alert('Connection Error !');
        });
    }
  };
}
