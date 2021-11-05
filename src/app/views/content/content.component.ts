import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/containers/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './content.component.html',
})
export class ContentComponent {
  avartar: string = '';
  avatar: any = '';
  constructor(private authService: AuthService, public router: Router) {
    let user = authService.getLocal();
    this.avatar = user.avatar;
  }
  logout = () => {
    this.authService.logout();
    this.router.navigate(['/login']);
  };
}
