import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { API_URL } from '../../constants/config';

@Injectable({
  providedIn: 'root',
})
export class AdvertiseService {
  constructor(public apiService: ApiService) {}

  search = (dataSearch: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/advertises/search`;
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
      let url = `${API_URL}api/advertises/get-all`;
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
      let url = `${API_URL}api/advertises/create-adv`;
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
      let url = `${API_URL}api/advertises/update-adv`;
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
      let url = `${API_URL}api/advertises/uploadFile`;
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
      let url = `${API_URL}api/advertises/delete-adv?id=${categoryId}`;
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
