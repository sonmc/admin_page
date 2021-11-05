import { Component, OnInit } from '@angular/core';
import { API_URL } from 'src/app/containers/constants/config';
import { AdvertiseService } from 'src/app/containers/services/advertise/advertise.service';
import { CommonService } from 'src/app/containers/services/common/common.service';
declare var $: any;

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
})
export class AdvertiseComponent implements OnInit {
  uploadStatus: string = '';

  advertises: any = [];

  advertise: any = {};

  type: any = '';
  messageError: any = '';

  dataSearch: any = {
    title: '',
    page: 0,
    pageSize: 0,
  };

  advertiseDetault: any = {
    title: '',
    category: '',
    note: '',
    daystart: '',
    dayend: '',
    link: '',
  };

  constructor(
    private advertiseService: AdvertiseService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.advertiseService
      .get()
      .then((res: any) => {
        if (res) {
          this.advertises = res;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  }

  openModalUpdate = (advertiseDetail: any) => {
    this.uploadStatus = '';
    if (advertiseDetail) {
      this.advertise = Object.assign({}, advertiseDetail);
      this.type = 'UPDATE';
    } else {
      this.advertise = Object.assign({}, this.advertiseDetault);
      this.type = 'CREATE';
    }

    $('#updateAdvModal').modal('show');
  };

  updateStartDate = (event: any) => {
    this.advertise.daystart = event.target.value;
  };

  updateEndDate = (event: any) => {
    this.advertise.dayend = event.target.value;
  };

  create = (advertiseCreate: any) => {
    this.advertiseService
      .create(advertiseCreate)
      .then((res: any) => {
        if (res) {
          this.advertises.push(res);
          $('#updateAdvModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  update = (caUpdate: any) => {
    this.advertiseService
      .update(caUpdate)
      .then((res: any) => {
        if (res) {
          this.advertises.forEach((element: any, index: number) => {
            if (element.id === res.id) {
              this.advertises[index] = res;
            }
          });
          $('#updateAdvModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  validationFormData = () => {
    let isDataCorrect = true;
    if (!this.advertise.title || !this.advertise.category) {
      isDataCorrect = false;
    }
    return isDataCorrect;
  };

  save = () => {
    if (this.validationFormData()) {
      if (this.type === 'CREATE') {
        this.create(this.advertise);
      } else {
        this.update(this.advertise);
      }
    } else {
      this.messageError = 'Loại sản phẩm không được để trống !';
    }
  };

  search = () => {
    this.advertiseService
      .search(this.dataSearch)
      .then((res: any) => {
        if (res) {
          this.advertises = res.data;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  close = () => {
    this.advertise = Object.assign({}, this.advertiseDetault);
    $('#updateAdvModal').modal('hide');
  };

  resetFormAddPro = () => {
    this.advertise = Object.assign({}, this.advertiseDetault);
  };

  remove = (caId: number) => {
    this.advertiseService
      .remove(caId)
      .then((res: any) => {
        if (res) {
          this.advertises = this.advertises.filter((x: any) => x.id !== res.id);
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
          this.advertise.image = API_URL + res.data;
        })
        .catch((e) => {
          window.alert('Connection Error !');
        });
    }
  };
}
