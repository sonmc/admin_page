import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { API_URL } from '../../constants/config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(public apiService: ApiService) {}

  search = (dataSearch: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/products/search`;
      this.apiService.postWithToken(url, dataSearch).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  get = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/products/get-all`;
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  create = (user: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/products/create-pro`;
      this.apiService.postWithToken(url, user).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  update = (user: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/products/update-pro`;
      this.apiService.postWithToken(url, user).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  uploadFile = (userId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/products/uploadFile`;
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  remove = (productId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/products/delete-pro?id=${productId}`;
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
}
