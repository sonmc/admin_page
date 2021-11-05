import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { API_URL } from '../../constants/config';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(public apiService: ApiService) {}

  search = (dataSearch: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/events/search`;
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
      let url = `${API_URL}api/events/event-get-new`;
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
      let url = `${API_URL}api/events/create-event`;
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
      let url = `${API_URL}api/events/update-event`;
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
      let url = `${API_URL}api/events/uploadFile`;
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

  remove = (eventId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}api/events/delete-event?id=${eventId}`;
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
