import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../containers/services/user/user.service';
import { AuthService } from '../../containers/services/auth/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  formLogin: FormGroup;
  messageError: string;
  imagePath: any;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public userService: UserService,
    private _sanitizer: DomSanitizer
  ) {
    this.messageError = '';
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
    });
  }
  login = () => {
    if (this.formLogin.valid) {
      let value = this.formLogin.value;
      this.authService
        .login(value['username'], value['password'])
        .then((res: any) => {
          if (res) {
            this.authService.saveLocal({
              token: res.token,
              avatar: res.image_url,
            });
            this.router.navigate(['/user']);
          } else {
            this.messageError = res['message'];
          }
        })
        .catch((e) => {
          window.alert('Connection Error !');
        });
    } else {
      this.messageError = 'Account or password invalid!';
    }
  };
}
