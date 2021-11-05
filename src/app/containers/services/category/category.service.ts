import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { API_URL } from '../../constants/config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(public apiService: ApiService) {}

  search = (dataSearch: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/categories/search`;
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
      let url = `${API_URL}api/categories/get-all`;
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
      let url = `${API_URL}api/categories/create-cat`;
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
      let url = `${API_URL}api/categories/update-cat`;
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
      let url = `${API_URL}api/categories/uploadFile`;
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

  remove = (categoryId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/categories/delete-cat?id=${categoryId}`;
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
