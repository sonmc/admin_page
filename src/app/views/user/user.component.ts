import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_URL } from 'src/app/containers/constants/config';
import { CommonService } from 'src/app/containers/services/common/common.service';
import { UserService } from '../../containers/services/user/user.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users: any = [];
  type: string = 'CREATE';
  messageError: string = '';
  uploadStatus: string = '';
  dataSearch: any = {
    taikhoan: '',
    hoten: '',
    page: 0,
    pageSize: 0,
  };
  userDetault = {
    hoten: '',
    email: '',
    ngaysinh: '',
    gioitinh: '',
    diachi: '',
    image_url: '',
    taikhoan: '',
    role: '',
    matkhau: '',
    confirmPwd: '',
  };
  user: any = {};

  constructor(
    public userService: UserService,
    private commonService: CommonService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService
      .get()
      .then((res: any) => {
        if (res) {
          this.users = res.data;
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  }

  openModalCreate = (userDetail: any) => {
    this.uploadStatus = '';
    if (userDetail) {
      this.user = Object.assign({}, userDetail);
      this.type = 'UPDATE';
    } else {
      this.user = Object.assign({}, this.userDetault);
      this.type = 'CREATE';
    }

    $('#updateUserModal').modal('show');
  };

  validationFormData = () => {
    let isDataCorrect = true;
    if (
      this.user.matkhau !== this.user.confirmPwd ||
      !this.user.hoten ||
      !this.user.email ||
      !this.user.ngaysinh ||
      !this.user.gioitinh ||
      !this.user.taikhoan ||
      !this.user.role ||
      !this.user.matkhau
    ) {
      isDataCorrect = false;
    }

    return isDataCorrect;
  };

  updateNgaySinh = (event: any) => {
    this.user.ngaysinh = event.target.value;
  };

  create = (userCreate: any) => {
    this.userService
      .create(userCreate)
      .then((res: any) => {
        if (res) {
          this.users.push(res);
          $('#updateUserModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  update = (userUpdate: any) => {
    this.userService
      .update(userUpdate)
      .then((res: any) => {
        if (res) {
          this.users.forEach((element: any, index: number) => {
            if (element.user_id === res.user_id) {
              this.users[index] = res;
            }
          });
          $('#updateUserModal').modal('hide');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };
  save = () => {
    if (this.validationFormData()) {
      delete this.user.confirmPwd;
      if (this.type === 'CREATE') {
        this.create(this.user);
      } else {
        this.update(this.user);
      }
    } else {
      this.messageError = 'Kiểm tra lại dữ liệu của form';
    }
  };

  remove = (userId: any) => {
    this.userService
      .remove(userId)
      .then((res: any) => {
        if (res) {
          this.users = this.users.filter((x: any) => x.user_id !== res.user_id);
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  search = () => {
    this.userService
      .search(this.dataSearch)
      .then((res: any) => {
        if (res) {
          this.users = res.data.filter((x: any) => x.role !== 'admin');
        }
      })
      .catch((e) => {
        window.alert('Connection Error !');
      });
  };

  close = () => {
    this.user = Object.assign({}, this.userDetault);
    $('#updateUserModal').modal('hide');
  };

  resetFormAddUser = () => {
    this.user = Object.assign({}, this.userDetault);
  };

  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files![0];
    if (file) {
      this.commonService
        .upload(file)
        .then((res: any) => {
          this.uploadStatus = res.message;
          this.user.image_url = API_URL + res.data;
        })
        .catch((e) => {
          window.alert('Connection Error !');
        });
    }
  };
}
