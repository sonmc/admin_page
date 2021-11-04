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
      let url = `${API_URL}users/search`;
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
      let url = `${API_URL}categories/get-all`;
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
      let url = `${API_URL}users/create-user`;
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
      let url = `${API_URL}users/update-user`;
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
      let url = `${API_URL}users/uploadFile`;
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

  remove = (userId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}users/delete-user?userId=${userId}`;
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
